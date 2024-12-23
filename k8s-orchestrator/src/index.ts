import express from 'express';
import cors from 'cors';
import { parseYaml } from './lib';
import * as k8s from '@kubernetes/client-node';

const app = express();

app.use(cors());
app.use(express.json());

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

app.post('/k8spod', async (req, res) => {
    //user should authenticate her
    const { projectId } = req.body

    if (!projectId) {
        res.json({
            message: "invalid project id"
        });
        return;
    };

    // create a pod for user with project id as a pod label
    const config = parseYaml(); 
    const nameSpace = 'default';

    const config2 = {
        "apiVersion": "apps/v1",
        "kind": "Deployment",
        "metadata": {
          "name": "project-id",
          "labels": {
            "app": "project-id"
          }
        },
        "spec": {
          "replicas": 3,
          "selector": {
            "matchLabels": {
              "app": "project-id"
            }
          },
          "template": {
            "metadata": {
              "labels": {
                "app": "project-id"
              }
            },
            "spec": {
              "containers": [
                {
                  "name": "project-id",
                  "image": "niginx",
                  "ports": [
                    {
                      "containerPort": 80
                    }
                  ]
                }
              ]
            }
          }
        }
      }

    try {
        switch (config.kind) {
            case 'Deployment':
                const response = await k8sApi.createNamespacedDeployment(nameSpace, config2);
                console.log('Response from k8sApi:', response);
                break;
            default:
                console.log('Config kind does not match any known types');
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
