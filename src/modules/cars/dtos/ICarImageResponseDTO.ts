interface ICarImageResponseDTO {
  id: string;
  image_name: string;
  car_id: string;
  created_at: Date;
  image_url(): string;
}

export { ICarImageResponseDTO };
