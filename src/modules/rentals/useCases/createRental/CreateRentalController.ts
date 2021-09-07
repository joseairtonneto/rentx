import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const { id } = request.user;
    const { expected_return_date, car_id } = request.body;

    const rental = await createRentalUseCase.execute({
      expected_return_date,
      car_id,
      user_id: id,
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
