import { inject, injectable } from "tsyringe";

import { CarImageMap } from "@modules/cars/mapper/CarImageMap";
import { CarMap } from "@modules/cars/mapper/CarMap";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

@injectable()
class ShowCarImagesUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute(id: string): Promise<CarMap> {
    const car = await this.carsRepository.findById(id);
    const images = await this.carsImagesRepository.findByCarId(id);
    const carImages = images.map((image) => CarImageMap.toDTO(image));

    return CarMap.toDTO(car, carImages);
  }
}

export { ShowCarImagesUseCase };
