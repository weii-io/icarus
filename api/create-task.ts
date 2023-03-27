import { CreateTaskDto } from "./dto";
import axios from "axios";

export const createTask = async (dto: CreateTaskDto) => {
  return axios.post("/tasks", dto, {
    withCredentials: true,
  });
};
