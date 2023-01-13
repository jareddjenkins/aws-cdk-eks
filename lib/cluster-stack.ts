import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { AutomateThingsChart } from './automate-app'
import * as cdk8s from 'cdk8s';


const dockerimage = "jareddjenkins/automate_things_app:v1"

export class ClusterStack extends cdk.Stack {
  public readonly cluster: eks.Cluster;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const primaryRegion = 'us-west-2';
    
    const clusterAdmin = new iam.Role(this, 'AdminRole', {
      assumedBy: new iam.AccountRootPrincipal()
    });

    const cluster = new eks.Cluster(this, 'demo-xyz-cluster', {
      clusterName: `demoxyz`,
      mastersRole: clusterAdmin,
      version: eks.KubernetesVersion.V1_21,
      defaultCapacity: 2
    });

    cluster.addAutoScalingGroupCapacity('spot-group', {
      instanceType: new ec2.InstanceType('m5.large'),
      spotPrice: cdk.Stack.of(this).region == primaryRegion ? '0.248' : '0.192'
    });

    this.cluster = cluster;   

    const cdk8sApp = new cdk8s.App();
    cluster.addCdk8sChart(
      'nginx-app-service',
      new AutomateThingsChart(cdk8sApp, 'nginx-app-chart', { image: dockerimage })
    );

  }
}

export interface EksProps extends cdk.StackProps {
  cluster: eks.Cluster
}
