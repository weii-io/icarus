export interface RegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  googleProfileId?: string;
}