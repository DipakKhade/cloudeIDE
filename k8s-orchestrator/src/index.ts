import express from 'express';
import cors from 'cors';
import { parseYaml } from './lib';
import { KubeConfig, AppsV1Api, CoreV1Api, NetworkingV1Api } from "@kubernetes/client-node";

const app = express();
app.use(cors());
app.use(express.json());

const kubeconfig = new KubeConfig();
kubeconfig.loadFromDefault();
const coreV1Api = kubeconfig.makeApiClient(CoreV1Api);
const appsV1Api = kubeconfig.makeApiClient(AppsV1Api);
const networkingV1Api = kubeconfig.makeApiClient(NetworkingV1Api);

app.post('/k8spod', async (req, res) => {
    //user should authenticate her
    const { projectId } = req.body

    if (!projectId) {
        res.json({
            message: "invalid project id"
        });
        return;
    };

    const config = parseYaml(projectId);
    const nameSpace = 'default';

    try {
        for (let doc of config) {
            switch (doc.kind) {
                case 'Deployment':
                    await appsV1Api.createNamespacedDeployment(nameSpace, doc);
                    console.log('Deployment created')
                    break;
                case 'Service':
                    await coreV1Api.createNamespacedService(nameSpace, doc)
                    console.log('service created')
                    return
                case 'Ingress':
                    await networkingV1Api.createNamespacedIngress(nameSpace, doc)
                    console.log('ingress created')
                default:
                    console.log('Config kind does not match any known types', doc.kind);
            }
        }
        res.json({
            message: "pod created"
        });

    } catch (error: any) {
        console.log('Error details:', error);
        res.json({
            message: "Failed to create pod",
            error: error.message
        });
    }
})

app.listen(process.env.PORT || 3001, () => console.log(`K8S http server is up`))
