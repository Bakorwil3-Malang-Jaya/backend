import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";
import suratMasukRoute from "./routes/suratMasukRoute.js";
import usersRoute from "./routes/usersRoute.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(
  cors({
    credentials: true,
    // origin: ["http://localhost:5174", "http://localhost:5173"],
    origin: ["http://localhost:5173"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));

// SURAT MASUK
app.use(suratMasukRoute);

// USERS
app.use(usersRoute);

app.listen(PORT, () =>
  console.log(`server telah berjalan dengan sukses di port: ${PORT}`)
);
