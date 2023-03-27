import axios from "axios";
import { LoginUserDto } from "./dto";

export async function loginUser(dto: LoginUserDto) {
  return axios.post("/auth/login", dto, { withCredentials: true });
}
