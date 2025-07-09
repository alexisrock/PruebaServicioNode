import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { container } from "./inversify.config";
import { InversifyExpressServer } from "inversify-express-utils";
import { errorHandler } from "./Presentation/Middleware/error.middleware";
import swaggerSpec from "./docs/swagger.config";
const main = async () => {
  const app = express();
  app.use(express.json());

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  let server = new InversifyExpressServer(
    container,
    null,
    { rootPath: "/api" },
    app
  );
  let appConfigured = server.build();
  appConfigured.use(errorHandler); // Aquí, después de build()
  console.log("App running on 3000");
  appConfigured.listen(3000, () => `App running on 3000`);
};

main().catch((err) => {
  console.error(err);
});
