import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("cars_image")
class CarImage {
  @PrimaryColumn()
  id: string;

  @Column()
  image_name: string;

  @Column()
  car_id: string;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: "image_url" })
  image_url(): string {
    switch (process.env.DISK) {
      case "local":
        return `${process.env.APP_API_URL}/cars/${this.image_name}`;
      case "s3":
        return `${process.env.AWS_BUCKET_URL}/cars/${this.image_name}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { CarImage };
