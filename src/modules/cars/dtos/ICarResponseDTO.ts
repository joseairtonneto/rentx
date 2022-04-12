import { Specification } from "../infra/typeorm/entities/Specification";
import { ICarImageResponseDTO } from "./ICarImageResponseDTO";

interface ICarResponseDTO {
  id?: string;
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  specifications?: Specification[];
  category_id: string;
  images: ICarImageResponseDTO[];
}

export { ICarResponseDTO };
