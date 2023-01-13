# Prerequesits
Install node https://nodejs.org/en/download/

Globally install cdk and cdk8s
```
npm install -g aws-cdk
npm i cdk8s-cli -g
```

Setup AWS CLI https://aws.amazon.com/cli/

In the cli, login to your aws account in us-west-2
```
aws configure
```

Bootstrap CDK into your environment
``bash
ACCOUNT_ID=$(aws sts get-caller-identity|jq -r ".Account")
cdk bootstrap aws://$ACCOUNT_ID/us-west-2
```
Ensure you have kubectl is setup for your cli, if not download and install it from here. https://kubernetes.io/docs/tasks/tools/

# Docker image
Note: a docker image was created and published publicly, you can view the [docker image](appcontainer/)) here and modify it if desired. The image used in this repo is jareddjenkins/automate_things_app:v1

# Create the cluster and deploy the application.
```bash
cdk deploy
eval $(aws cloudformation describe-stacks \
  --stack-name ClusterStack-us-west-2 \
  --query "Stacks[0].Outputs[1].OutputValue" \
  --output text)
curl $(kubectl get services -o jsonpath='{.items[*].status.loadBalancer.ingress[0].hostname}')
```

Alternatively run the follow command
```bash
sh single_click_test_deploy.sh
```



