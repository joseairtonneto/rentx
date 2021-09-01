import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { deleteFile } from "@utils/file";

interface IRequest {
  images_name: string[];
  car_id: string;
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ images_name, car_id }: IRequest): Promise<void> {
    images_name.map(async (image_name) => {
      await this.carsImagesRepository.create(car_id, image_name);
      await deleteFile(`./tmp/cars/${image_name}`);
    });
  }
}

export { UploadCarImagesUseCase };
