import { Router } from "express";
import { firebaseAuthUserSchema, loginSchema, signupSchema } from "../../../zod";
import { db } from "../../../db/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcypt from "bcrypt";
import { saltRounds } from "../../../lib/config";
import { firebaseAuthMiddleware } from "../../../middleware/firebaseAuth";

export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const data = req.body;

  const parsedData = signupSchema.safeParse(data);

  if (parsedData.error) {
    res.json({
      message: parsedData.error,
    });
    return;
  }
  const { email, username, password } = data;
  const hashedPassword = await bcypt.hash(password, saltRounds);
  const new_user = await db.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  res.json({
    message: "User created successfully",
    user_id: new_user.id,
  });
  return;
});

userRouter.post("/signin", async (req, res) => {
  const data = req.body;

  const parsedData = loginSchema.safeParse(data);

  if (parsedData.error) {
    res.json({
      message: parsedData.error,
    });
    return;
  }

  const user = await db.user.findFirst({
    where: {
      email: parsedData.data.email,
    },
  });

  if (!user) {
    res.json({
      message: "user not found",
    });
    return;
  }

  if(user.password){
    const matchPassword = bcypt.compare(parsedData.data.password, user?.password);
    if (!matchPassword) {
      res.json({
        message: "incorrect password",
      });
      return;
    }
  }

 
  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
    } as JwtPayload,
    process.env.JWT_SEC as string
  );

  res.json({
    token,
    user_id: user.id,
  });
  return;
});

userRouter.post('/addgooglesigninuser', async(req,res)=>{
    const data = req.body.data;
    console.log(data)
    const parsedData = firebaseAuthUserSchema.safeParse(data);
    if(parsedData.error){
      res.json({
        message:"invalid user cred",
        data:parsedData.error?.message
      });
      return;
    };

    if(parsedData.data?.name && parsedData.data?.email){
      const new_user = await db.user.create({
        data:{
          username:parsedData.data?.name,
          email:parsedData.data?.email,
        }
      })
    }

    res.json({
      message:"user created succefully",
    });
    return;
})