import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let dayjsDateProvider: DayjsDateProvider;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "test",
      user_id: "test",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is already one open for the user", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "test1",
        user_id: "test",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: "test2",
        user_id: "test",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with an already rented car", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "test",
        user_id: "test1",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: "test",
        user_id: "test2",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with less than 24 hours", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "test",
        user_id: "test",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
