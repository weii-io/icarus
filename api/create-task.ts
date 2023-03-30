import { CreateTaskDto } from "./dto";
import axios from "axios";

export const createTask = async (
  cookie: string | undefined,
  dto: CreateTaskDto
) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, dto, {
    withCredentials: true,
    headers: { cookie: cookie },
  });
};
