import "reflect-metadata";
import express from "express";

import { container } from "./inversify.config";
import { InversifyExpressServer } from "inversify-express-utils";
const main = async () => {


  const app = express();
  app.use(express.json());
  let server = new InversifyExpressServer(
    container,
    null,
    { rootPath: "/api" },
    app
  );
  let appConfigured = server.build();
  console.log("App running on 3000");
  appConfigured.listen(3000, () => `App running on 3000`);
};

main().catch((err) => {
  console.error(err);
});
