import "reflect-metadata";
import { createConnection } from "typeorm";
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

import routes from "./routes";

const PORT = process.env.PORT || 3000;

createConnection()
  .then(async () => {
    // create express app
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    app.use("/", routes);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
