import axios from "axios";
import { CreateUserDto } from "./dto";

export async function createUser(dto: CreateUserDto) {
  return axios.post("/auth/register", dto);
}
