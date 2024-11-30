import { Router } from "express";
import { createProjectSchema, getTemplateCode } from "../../../zod";
import { db } from "../../../db/prisma";
import { authMiddleware } from "../../../middleware/auth";
import { createUserProject, getBoilerPlateCode } from "../../../s3";
import { firebaseAuthMiddleware } from "../../../middleware/firebaseAuth";

export const projectRouter = Router();


projectRouter.get("/createnewproject", firebaseAuthMiddleware, async (req, res) => {
  const data = req.query;
  const parsedData = getTemplateCode.safeParse(data);
  if (parsedData.error) {
    res.json({
      message: parsedData.error,
    });
    return;
  }
  await createUserProject(req.userId, "nodejs")
  const files = await getBoilerPlateCode("nodejs", req.userId);
  const new_project = await db.project.create({
    data: {
      userId: req.userId,
      language: parsedData.data.template,
      name: parsedData.data.name
    }
  })
  res.json({
    files,
    id: new_project.id
  });
});

projectRouter.get("/projectlist", authMiddleware, async (req, res) => {
  try {
    const data = await db.project.findMany({
      where: {
        userId: req.userId,
      },
    });
    res.json({
      data,
    });
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});


projectRouter.get('/getfilecontent', async (req, res) => {

})
