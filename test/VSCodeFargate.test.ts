import '@aws-cdk/assert/jest';
import { Vpc } from '@aws-cdk/aws-ec2';
import { HostedZone } from '@aws-cdk/aws-route53';
import { App, Stack } from '@aws-cdk/core';
import { VSCodeFargate } from '../src';

const env = {
  region: process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT,
};

const subdomain = process.env.VSCODE_SUBDOMAIN ?? 'vscode';
const domainName = process.env.VSCODE_DOMAIN_NAME ?? 'mydomain.com';

describe('fargate service', () => {

  /**
   * Helper function for getting a test stack
   * @param props properties that are passed to the VSCodeFargate constructor
   */
  function getStack(props: any) {
    const app = new App();
    const stack = new Stack(app, 'TestStack', { env });
    const vpc = new Vpc(stack, 'test-vpc', { natGateways: 1 });
    const hostedZone = new HostedZone(stack, 'test-hz', { zoneName: domainName });

    new VSCodeFargate(stack, 'TestConstruct', {
      subdomain,
      domainName,
      vpc,
      hostedZone,
      ...props,
    });
    return { stack };
  }

  /**
   * HostedZone should remain optional but for testing, which is awkward and fragile with context, we're going
   * to allow one to be passed in.
   */
  test('uses provided hostedZone', () => {
    // when
    // an app
    const app = new App();

    // has two stacks
    const stack = new Stack(app, 'TestStack', { env });
    const stack2 = new Stack(app, 'stack2', { env });

    // with the hostedzone in the second stack
    const hostedZone = new HostedZone(stack2, 'test-hz', { zoneName: domainName });

    // and with a new vpc in the same stack
    const vpc = new Vpc(stack, 'test-vpc', { natGateways: 1 });

    // the construct
    new VSCodeFargate(stack, 'TestConstruct', { subdomain, domainName, vpc, hostedZone });

    // doesn't have a hostedZone
    expect(stack).not.toHaveResourceLike('AWS::Route53::HostedZone');
  });

  test('uses default container image', () => {
    const { stack } = getStack({});

    expect(stack).toHaveResourceLike('AWS::ECS::TaskDefinition', {
      ContainerDefinitions: [
        { Image: 'ghcr.io/linuxserver/code-server' },
      ],
    });
  });

  test('uses provided container image', () => {

    const { stack } = getStack({
      containerImage: 'ghcr.io/linuxserver/code-server-some-variant',
    });
    expect(stack).toHaveResourceLike('AWS::ECS::TaskDefinition', {
      ContainerDefinitions: [
        { Image: 'ghcr.io/linuxserver/code-server-some-variant' },
      ],
    });
  });

});
