import * as cdk from '@aws-cdk/core';
import codecommit = require('@aws-cdk/aws-codecommit');
import ecr = require('@aws-cdk/aws-ecr');
import codepipeline = require('@aws-cdk/aws-codepipeline');
import pipelineAction = require('@aws-cdk/aws-codepipeline-actions');
import { codeToECRspec, deployToEKSspec } from '../utils/buildspecs';


export class EcrStack extends cdk.Stack {

    constructor(scope: cdk.Construct, id: string) {
        super(scope, id);
        const ecrForMainRegion = new ecr.Repository(this, `ecr-demo-xyz`);
    }
}