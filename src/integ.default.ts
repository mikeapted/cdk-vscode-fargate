import * as ec2 from '@aws-cdk/aws-ec2';
import * as cdk from '@aws-cdk/core';
import { VSCodeFargate } from './index';

const app = new cdk.App();

const env = {
  region: process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT,
};

const subdomain = process.env.VSCODE_SUBDOMAIN ?? 'vscode';
const domainName = process.env.VSCODE_DOMAIN_NAME ?? 'mydomain.com';

const stack = new cdk.Stack(app, 'example-stack', {
  env,
});

const vpc = ec2.Vpc.fromLookup(stack, 'Vpc', {
  isDefault: true,
});

new VSCodeFargate(stack, 'MyVSCodeFargate', {
  domainName,
  subdomain,
  vpc,
});

app.synth();
