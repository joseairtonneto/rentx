import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { deleteFile } from "@utils/file";

interface IRequest {
  images_name: string[];
  car_id: string;
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ images_name, car_id }: IRequest): Promise<void> {
    images_name.map(async (image_name) => {
      await this.carsImagesRepository.create(car_id, image_name);
      await this.storageProvider.save(image_name, "cars");
    });
  }
}

export { UploadCarImagesUseCase };
