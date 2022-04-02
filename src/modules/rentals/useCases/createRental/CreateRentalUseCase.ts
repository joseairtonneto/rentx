import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumReturnDate = 24;

    const rentedCar = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (rentedCar) {
      throw new AppError("Car already rented!");
    }

    const openRentUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (openRentUser) {
      throw new AppError("User already have a rental in progress!");
    }

    const dateNow = this.dateProvider.dateNow();

    const compareDates = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compareDates < minimumReturnDate) {
      throw new AppError("Expected return date must be at least 24 hours!");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
