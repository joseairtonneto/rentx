import { instanceToInstance } from "class-transformer";

import { ICarImageResponseDTO } from "../dtos/ICarImageResponseDTO";
import { ICarResponseDTO } from "../dtos/ICarResponseDTO";
import { Car } from "../infra/typeorm/entities/Car";

class CarMap {
  static toDTO(
    {
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      specifications,
      category_id,
    }: Car,
    images: ICarImageResponseDTO[]
  ): ICarResponseDTO {
    const car = instanceToInstance({
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      specifications,
      category_id,
      images,
    });

    return car;
  }
}

export { CarMap };
