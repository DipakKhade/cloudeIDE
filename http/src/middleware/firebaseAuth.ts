import { NextFunction, Request, Response } from "express";
import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.applicationDefault(), 
});


export  const firebaseAuthMiddleware = async(req:Request,res:Response,next:NextFunction) =>{
    const token = req.headers.token as string;

    if(!token){
        res.json({
            message:"token not found"
        });
        return;
    }
    const auth = admin.auth().verifyIdToken(token).then((decodedToken:any)=>{
        console.log(decodedToken)
        next();
    }).catch((err:any)=>{
        res.json({
            message:"invalid credentionals",
            data:err.message
        })
        return;
    })

}