#!/usr/bin/sh
cdk deploy
eval $(aws cloudformation describe-stacks \
  --stack-name ClusterStack-us-west-2 \
  --query "Stacks[0].Outputs[1].OutputValue" \
  --output text)
curl $(kubectl get services -o jsonpath='{.items[*].status.loadBalancer.ingress[0].hostname}')