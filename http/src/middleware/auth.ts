import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  // const Bearertoken = req.headers.token;
  // console.log(req.headers.token);
  // const token = (Bearertoken as string).split(" ")[1];

  // if (!token) {
  //   return res.json({
  //     message: "token not found",
  //   });
  // }

  try {
    // const verifyToken = jwt.verify(token, process.env.JWT_SEC!) as {
    //   userId: number;
    //   username: string;
    // };

    // console.log(verifyToken);

    // if (!verifyToken) {
    //   return res.json({
    //     message: "unauthorized",
    //   });
    // }

    // req.userId = verifyToken.userId;
    req.userId = 1;

    next();
  } catch (error) {
    console.log(error);
    res.json({
      message: "something went wrong at middleware",
    });
  }
};
