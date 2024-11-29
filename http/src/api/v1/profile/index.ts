import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth";
import { db } from "../../../db/prisma";
import { updateProfileSchema } from "../../../zod";

export const profileRouter = Router();

profileRouter.get("/getprofile", async (req, res) => {
  try {
    const user = await db.user.findFirst({
      where: {
        id: req.userId,
      },
    });
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
      return;
    }
    res.json({
      user_id: user.id,
      username: user.username,
      email: user.email,
      // creaated_at: user.createdate,
    });
    return;
  } catch (errror) {
    res.status(500).json({
      message: "unable to find user",
    });
  }
});

profileRouter.put("/updateprofile", async (req, res) => {
  const data = req.body;
  const parsedData = updateProfileSchema.safeParse(data);
  if (parsedData.error) {
    res.json({
      message: "invalid schema",
    });
    return;
  }

  try {
    await db.user.update({
      data: {
        username: parsedData.data.newEmail,
        email: parsedData.data.newUsername,
      },
      where: {
        id: req.userId,
      },
    });

    res.json({
      message: "profile updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong",
    });
  }
});
