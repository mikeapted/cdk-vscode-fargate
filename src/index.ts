import * as acm from '@aws-cdk/aws-certificatemanager';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as patterns from '@aws-cdk/aws-ecs-patterns';
import * as efs from '@aws-cdk/aws-efs';
import * as logs from '@aws-cdk/aws-logs';
import * as route53 from '@aws-cdk/aws-route53';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';
import * as cdk from '@aws-cdk/core';

export interface VSCodeFargateProps {
  /**
   * An optional HostedZone to use. If not provided, then `domainName` is used to look one up using context
   *
   * @optional
   */
  readonly hostedZone?: route53.IHostedZone;
  /**
   * An optional container image to use. If not provided, then 'ghcr.io/linuxserver/code-server' is used.
   *
   * @default ghcr.io/linuxserver/code-server
   */
  readonly containerImage?: string;

  /**
   * A subdomain for the new endpoint.
   * @example vscode
   */
  readonly subdomain: string;

  /**
   * A full domain to register the new endpoint in.
   *
   * @example myprojects.com
   */
  readonly domainName: string;

  /**
   * An optional VPC to put ECS in
   *
   * @default default VPC from lookup
   */
  readonly vpc?: ec2.IVpc;
}

/**
 * A construct that consists of an ECS Service and related infrastructure to host a VSCode instance using
 * a container (defaults to ghcr.io/linuxserver/code-server). Data is persisted via an EFS volume.
 */
export class VSCodeFargate extends cdk.Construct {
  readonly endpoint: string;

  constructor(scope: cdk.Construct, id: string, props: VSCodeFargateProps) {
    super(scope, id);

    const stack = cdk.Stack.of(this);

    const hostedZone = props.hostedZone ?? route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: props.domainName,
    });

    const certificate = new acm.Certificate(this, 'Certificate', {
      domainName: `${props.subdomain}.${props.domainName}`,
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });

    const vpc = props.vpc ?? new ec2.Vpc(this, 'Vpc', {
      natGateways: 1,
    });

    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc,
    });

    const fileSystem = new efs.FileSystem(this, 'EfsFileSystem', {
      vpc,
      lifecyclePolicy: efs.LifecyclePolicy.AFTER_30_DAYS,
      performanceMode: efs.PerformanceMode.GENERAL_PURPOSE,
    });

    const volume = {
      name: 'myHomeVolume',
      efsVolumeConfiguration: {
        fileSystemId: fileSystem.fileSystemId,
      } as ecs.EfsVolumeConfiguration,
    } as ecs.Volume;

    const secret = new secretsmanager.Secret(this, 'Secret');

    const loadBalancedFargateService = new patterns.ApplicationLoadBalancedFargateService(this, 'Service', {
      assignPublicIp: true,
      certificate,
      cluster,
      cpu: 1024,
      domainName: `${props.subdomain}.${props.domainName}`,
      domainZone: hostedZone,
      memoryLimitMiB: 2048,
      platformVersion: ecs.FargatePlatformVersion.VERSION1_4,
      publicLoadBalancer: true,
      redirectHTTP: true,
      taskImageOptions: {

        containerPort: 8443,
        secrets: {
          PASSWORD: ecs.Secret.fromSecretsManager(secret),
        },
        image: ecs.ContainerImage.fromRegistry(props.containerImage ?? 'ghcr.io/linuxserver/code-server'),
        logDriver: new ecs.AwsLogDriver({
          streamPrefix: 'app',
          logGroup: new logs.LogGroup(this, 'LogGroup', {
            logGroupName: `/app/${stack.stackName}/${id}`,
            retention: logs.RetentionDays.TWO_MONTHS,
          }),
        }),
      },
    });

    loadBalancedFargateService.taskDefinition.addVolume(volume);
    loadBalancedFargateService.service.connections.allowFrom(fileSystem, ec2.Port.tcp(2049));
    loadBalancedFargateService.service.connections.allowTo(fileSystem, ec2.Port.tcp(2049));

    const mountPoint = {
      readOnly: true,
      containerPath: '/efs',
      sourceVolume: volume.name,
    } as ecs.MountPoint;

    loadBalancedFargateService.taskDefinition.defaultContainer?.addMountPoints(mountPoint);

    loadBalancedFargateService.targetGroup.configureHealthCheck({
      path: '/login',
    });

    this.endpoint = loadBalancedFargateService.loadBalancer.loadBalancerDnsName;
  }
}
