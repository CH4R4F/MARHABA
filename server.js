require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
// use initial middlewares
app.use(express.json());
app.use(cors());
app.use(require("./routes"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));
