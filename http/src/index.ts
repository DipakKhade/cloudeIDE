import express from "express";
import { v1Router } from "./api/v1";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", v1Router);

app.listen(PORT, () => {
  console.log(`http server is up on PORT ${PORT}`);
});

