#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ClusterStack } from '../lib/cluster-stack';
import { EcrStack } from '../lib/ecr-stack';
import { Image } from 'cdk8s-image'

const app = new cdk.App();

const account = app.node.tryGetContext('account') || process.env.CDK_INTEG_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT;
const primaryRegion = {account: account, region: 'us-west-2'};
const secondaryRegion = {account: account, region: 'us-east-2'};

const primaryCluster = new ClusterStack(app, `ClusterStack-${primaryRegion.region}`, {env: primaryRegion })


