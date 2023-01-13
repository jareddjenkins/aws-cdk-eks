import * as cdk8s from 'cdk8s';
import * as constructs from 'constructs';
import * as kplus from 'cdk8s-plus-24';


export interface AutomateThingsProps {
    image: string;
}

export class AutomateThingsChart extends cdk8s.Chart {
    constructor(
        scope: constructs.Construct,
        id: string,
        props: AutomateThingsProps
      )  {
        super(scope, id);
        // store the deployment to created in a constant
        const frontends = new kplus.Deployment(this, 'FrontEnds', {
            containers: [{
                image: props.image,
                portNumber: 8080,
                imagePullPolicy: kplus.ImagePullPolicy.ALWAYS,
                securityContext: { 
                    privileged: true,
                    ensureNonRoot:false, 
                    allowPrivilegeEscalation: true
                },
            }],
        });
        frontends.exposeViaService({
            serviceType: kplus.ServiceType.LOAD_BALANCER,
            ports: [{
                port: 80,
                targetPort: 8080
            }]
        })
    }
}