import axios from "axios";

interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function createUser(dto: CreateUserDto) {
  return axios.post("/auth/register", dto);
}
