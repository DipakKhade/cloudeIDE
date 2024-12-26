import { Router } from "express";
import { createProjectSchema, getTemplateCode } from "../../../zod";
import { db } from "../../../db/prisma";
import { authMiddleware } from "../../../middleware/auth";
import { createUserProject, getBoilerPlateCode } from "../../../s3";

export const projectRouter = Router();


projectRouter.get("/createnewproject", authMiddleware , async (req, res) => {
  const data = req.query;
  const parsedData = getTemplateCode.safeParse(data);
  if (parsedData.error) {
    res.json({
      message: parsedData.error,
    });
    return;
  }
  const new_project = await db.project.create({
    data: {
      userId: req.userId,
      language: parsedData.data.template,
      name: parsedData.data.name
    }
  });
  console.log(new_project);
  await createUserProject(new_project.id, "nodejs")
  const files = await getBoilerPlateCode("nodejs", new_project.id);
  res.json({
    files,
    id: new_project.id
  });
  return
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


projectRouter.get('/getfilecontent', authMiddleware , async (req, res) => {
  const userId = req.userId;

    const allProjects = await db.project.findMany({
      where:{
        userId
      }
    })

    res.json({
      allProjects
    });
    
    return;

})
