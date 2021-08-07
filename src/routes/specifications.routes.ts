import { Router } from "express";

import { SpecificationRepository } from "../modules/cars/repositories/specification/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();
const specificationRepository = new SpecificationRepository();

specificationsRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createSpecificationService = new CreateSpecificationService(
    specificationRepository
  );

  try {
    createSpecificationService.execute({ name, description });

    response
      .status(201)
      .json({ message: "Specification created successfully" });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

export { specificationsRoutes };
