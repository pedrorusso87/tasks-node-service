import "reflect-metadata";
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
import routes from "./routes";
import "./database";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(__dirname + "/entity/*{.ts, .js}");
  console.log(process.env.DATABASE_URL);
  console.log(`Server running on port ${PORT}`);
});
