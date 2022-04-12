import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowCarImagesUseCase } from "./ShowCarImagesUseCase";

class ShowCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showCarImagesUseCase = container.resolve(ShowCarImagesUseCase);

    const { id } = request.params;

    const car = await showCarImagesUseCase.execute(id);

    return response.json(car);
  }
}

export { ShowCarImagesController };
