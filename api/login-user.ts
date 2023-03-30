import axios from "axios";
import { LoginUserDto } from "./dto";

export async function loginUser(dto: LoginUserDto) {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, dto, {
    withCredentials: true,
  });
}
