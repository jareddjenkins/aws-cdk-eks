#!/usr/bin/sh
cdk deploy --require-approval never
eval $(aws cloudformation describe-stacks \
  --stack-name ClusterStack-us-west-2 \
  --query "Stacks[0].Outputs[1].OutputValue" \
  --output text)
#It takes a little while for dns to update. Sleeping.
sleep 60  
curl $(kubectl get services -o jsonpath='{.items[*].status.loadBalancer.ingress[0].hostname}')