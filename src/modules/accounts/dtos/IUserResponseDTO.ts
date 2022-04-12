interface IUserResponseDTO {
  id: string;
  avatar: string;
  name: string;
  email: string;
  driver_license: string;
  avatar_url(): string;
}

export { IUserResponseDTO };
