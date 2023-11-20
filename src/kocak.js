const express = require("express");
const FileUpload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const suratMasukRoute = require("./routes/suratMasukRoute.js");
const suratKeluarRoute = require("./routes/suratKeluarRoute.js");
const requestRoute = require("./routes/requestRoute.js");
const usersRoute = require("./routes/usersRoute.js");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));

// Penanganan CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.options("*", cors());

// SURAT MASUK
app.use(suratMasukRoute);

// SURAT KELUAR
app.use(suratKeluarRoute);

// REQUEST
app.use(requestRoute);

// USERS
app.use(usersRoute);

app.listen(PORT, () =>
  console.log(`Server berjalan dengan sukses di port: ${PORT}`)
);
