import { CategoriesRepository } from "../../repositories/categories/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoriesRepository = new CategoriesRepository();

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

const createCategoriesController = new CreateCategoryController(
  createCategoryUseCase
);

export { createCategoriesController };
