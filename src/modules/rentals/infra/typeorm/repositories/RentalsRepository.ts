import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    expected_return_date,
    car_id,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      expected_return_date,
      car_id,
      user_id,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rentedCar = await this.repository.findOne({ car_id });

    return rentedCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openRentUser = await this.repository.findOne({ user_id });

    return openRentUser;
  }
}

export { RentalsRepository };
