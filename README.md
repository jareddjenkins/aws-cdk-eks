# Prerequesits
Install node https://nodejs.org/en/download/

1. Clone the repository locally and change into that directory

1. Globally install aws cdk so that cli commands work
    ```bash
    npm install -g aws-cdk
    npm i cdk8s-cli -g
    ```

1. Ensure your  AWS CLI is setup. https://aws.amazon.com/cli/

1. Login to your aws account in us-west-2
    ```bash
    aws configure
    ```

1. Bootstrap CDK into your environment
    ```bash
    ACCOUNT_ID=$(aws sts get-caller-identity|jq -r ".Account")
    cdk bootstrap aws://$ACCOUNT_ID/us-west-2
    ```
1. Run npm install
    ```bash
    npm i
    ```
1. Ensure you have kubectl is setup for your cli, if not download and install it from here. https://kubernetes.io/docs/tasks/tools/

# Docker image
Note: a docker image was created and published publicly, you can view the [docker image](appcontainer/)) here and modify it if desired. The image used in this repo is jareddjenkins/automate_things_app:v1

# Create the cluster and deploy the application. You will be asked to review and confirm changes.
```bash
cdk deploy
eval $(aws cloudformation describe-stacks \
  --stack-name ClusterStack-us-west-2 \
  --query "Stacks[0].Outputs[1].OutputValue" \
  --output text)
# You may need to try the below step a few times until DNS is up to date.
curl $(kubectl get services -o jsonpath='{.items[*].status.loadBalancer.ingress[0].hostname}')
```

Alternatively run the follow script to automatically deploy changes and see the response.
```bash
sh single_click_test_deploy.sh
```

# Cleanup
```bash
cdk destroy
```


