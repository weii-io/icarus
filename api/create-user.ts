import axios from "axios";
import { CreateUserDto } from "./dto";

export async function createUser(dto: CreateUserDto) {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, dto);
}
