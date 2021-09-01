import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to a non-existent car", async () => {
    expect(async () => {
      await specificationsRepositoryInMemory.create({
        name: "Specification Test",
        description: "Specification Test Description",
      });

      const specification = await specificationsRepositoryInMemory.findByName(
        "Specification Test"
      );

      await createCarSpecificationUseCase.execute({
        car_id: "wrong_id",
        specifications_id: [specification.id],
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const specification = await specificationsRepositoryInMemory.create({
      name: "Specification Test",
      description: "Specification Test Description",
    });

    const car = await carsRepositoryInMemory.create({
      name: "Car Test",
      description: "Car Test Description",
      brand: "Brand",
      daily_rate: 100,
      fine_amount: 10,
      license_plate: "ABCD-1234",
      category_id: "Category Test",
    });

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
