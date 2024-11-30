import { NextFunction, Response, Request } from "express";
import { initializeApp } from "firebase-admin/app";
import { getAppCheck } from "firebase-admin/app-check";

const firebaseApp = initializeApp();

export const firebaseAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const appCheckToken = req.headers?.token as string;
    console.log(appCheckToken)
    if (!appCheckToken) {
        res.json({
            message: "token not found"
        });
        return

    }
    try {

        const appCheckClaims = await getAppCheck().verifyToken(appCheckToken);
        console.log(appCheckClaims);

        return next();
    } catch (err) {
        res.status(401);
        return next("Unauthorized");
    }
}

