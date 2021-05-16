import * as cdk from '@aws-cdk/core';
import { VSCodeFargate } from '../src/index';

import '@aws-cdk/assert/jest';

const env = {
  region: process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT,
};

const subdomain = process.env.VSCODE_SUBDOMAIN ?? 'vscode';
const domainName = process.env.VSCODE_DOMAIN_NAME ?? 'mydomain.com';

test('create app', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack', { env });
  // const vpc = ec2.Vpc.fromLookup(stack, 'Vpc', {
  //   isDefault: true,
  // });
  new VSCodeFargate(stack, 'TestConstruct', { subdomain, domainName });
  expect(stack).toHaveResource('AWS::ECS::Cluster');
});