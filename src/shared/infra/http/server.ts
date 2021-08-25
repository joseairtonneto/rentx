import express, { Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import "@shared/container";
import { AppError } from "@shared/errors/AppError";
import "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use((err: Error, _request: Request, response: Response) => {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({ message: err.message });
  }

  return response.status(500).send({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(3333, () => console.log("Server is running!🚀️"));
