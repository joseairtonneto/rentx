import { Router } from "express";
import multer from "multer";

import createCategoriesController from "../modules/cars/useCases/createCategory";
import importCategoriesController from "../modules/cars/useCases/importCategories";
import listCategoriesController from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

const upload = multer({ dest: "./tmp" });

categoriesRoutes.post("/", (request, response) =>
  createCategoriesController().handle(request, response)
);

categoriesRoutes.get("/", (request, response) =>
  listCategoriesController().handle(request, response)
);

categoriesRoutes.post("/import", upload.single("file"), (request, response) =>
  importCategoriesController().handle(request, response)
);

export { categoriesRoutes };
