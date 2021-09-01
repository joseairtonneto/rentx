import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCarUseCase = container.resolve(CreateCarUseCase);

    const {
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      brand,
      category_id,
    } = request.body;

    const car = await createCarUseCase.execute({
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      brand,
      category_id,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarController };
