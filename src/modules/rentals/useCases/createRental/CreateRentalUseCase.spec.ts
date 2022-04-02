import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let dayjsDateProvider: DayjsDateProvider;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_test",
    });
    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "test",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is already one open for the user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test1",
      user_id: "test",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "test",
        car_id: "test2",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("User already have a rental in progress!"));
  });

  it("should not be able to create a new rental with an already rented car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      user_id: "test1",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "test",
        user_id: "test2",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car already rented!"));
  });

  it("should not be able to create a new rental with less than 24 hours", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "test",
        user_id: "test",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(
      new AppError("Expected return date must be at least 24 hours!")
    );
  });
});
