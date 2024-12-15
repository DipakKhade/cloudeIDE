import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/k8spod',async(req,res)=>{
    //user should authenticate here
    const { projectId } = req.body
    console.log(projectId)
    if(!projectId){
        res.json({
            message:"invalid project id"
        });
        return;
    };

    // create a pod fort user with project id as a pod label


    res.json({
        message:"pod created"
    })
})

app.listen(process.env.PORT || 3001 , ()=>console.log(`K8S http server is up`))