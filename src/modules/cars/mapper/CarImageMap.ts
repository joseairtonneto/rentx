import { instanceToInstance } from "class-transformer";

import { ICarImageResponseDTO } from "../dtos/ICarImageResponseDTO";
import { CarImage } from "../infra/typeorm/entities/CarImage";

class CarImageMap {
  static toDTO({
    id,
    car_id,
    image_name,
    created_at,
    image_url,
  }: CarImage): ICarImageResponseDTO {
    const carImage = instanceToInstance({
      id,
      car_id,
      image_name,
      created_at,
      image_url,
    });

    return carImage;
  }
}

export { CarImageMap };
