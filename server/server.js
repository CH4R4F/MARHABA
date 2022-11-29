require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
const initDb = require("./config/initDb.js");
const cookieParser = require("cookie-parser");

initDb();

const app = express();
// use initial middlewares
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_END_URL,
  })
);
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(require("./routes"));

// apply error middleware
app.use(errorHandler);

// save logs in a log file
const logFile = fs.createWriteStream("./app.log", {
  flags: "a",
});
app.use(morgan("combined", { stream: logFile }));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));

export default app;
