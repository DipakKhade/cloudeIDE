import { Router } from "express";
import { userRouter } from "./user";
import { profileRouter } from "./profile";
import { projectRouter } from "./project";
export const v1Router = Router();

v1Router.use("/user", userRouter);
v1Router.use("/profile", profileRouter);
v1Router.use("/project", projectRouter);
