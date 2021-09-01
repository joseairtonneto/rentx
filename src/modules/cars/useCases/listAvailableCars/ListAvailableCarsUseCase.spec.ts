import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarsUseCase: CreateCarUseCase;
let listCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarsUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it("should be able to list all available cars", async () => {
    await createCarsUseCase.execute({
      name: "Car1",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_test",
    });

    await createCarsUseCase.execute({
      name: "Car2",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "EFGH-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_test",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toHaveLength(2);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await createCarsUseCase.execute({
      name: "Car1",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_test",
    });

    await createCarsUseCase.execute({
      name: "Car2",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "EFGH-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_test1",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "category_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await createCarsUseCase.execute({
      name: "Car1",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_test",
    });

    await createCarsUseCase.execute({
      name: "Car2",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "EFGH-1234",
      fine_amount: 60,
      brand: "Brand1",
      category_id: "category_test",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Brand",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await createCarsUseCase.execute({
      name: "Car1",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_test",
    });

    await createCarsUseCase.execute({
      name: "Car2",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "EFGH-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_test",
    });

    const cars = await listCarsUseCase.execute({
      name: "Car1",
    });

    expect(cars).toEqual([car]);
  });
});
