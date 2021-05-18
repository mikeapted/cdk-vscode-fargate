const { AwsCdkConstructLibrary } = require('projen');
const project = new AwsCdkConstructLibrary({
  author: 'Mike Apted',
  authorAddress: 'mikapted@amazon.com',
  cdkVersion: '1.104.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-vscode-fargate',
  repositoryUrl: 'https://github.com/mikeapted/cdk-vscode-fargate.git',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-certificatemanager',
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-ecs',
    '@aws-cdk/aws-ecs-patterns',
    '@aws-cdk/aws-efs',
    '@aws-cdk/aws-kms',
    '@aws-cdk/aws-logs',
    '@aws-cdk/aws-route53',
    '@aws-cdk/aws-secretsmanager',
  ],
  gitignore: ['cdk.out', 'cdk.context.json'],
  python: {
    distName: 'cdk-vscode-fargate',
    module: 'cdk_vscode_fargate'
  },

  // cdkDependencies: undefined,        /* Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? */
  // cdkTestDependencies: undefined,    /* AWS CDK modules required for testing. */
  // deps: [],                          /* Runtime dependencies of this module. */
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                       /* Build dependencies for this module. */
  // packageName: undefined,            /* The "name" in package.json. */
  // projectType: ProjectType.UNKNOWN,  /* Which type of project this is (library/app). */
  // releaseWorkflow: undefined,        /* Define a GitHub workflow for releasing from "main" when new versions are bumped. */
});
project.synth();