import React from "react";
import { CreateTaskDto } from "../../service/dto";

export interface ICreateTaskContext {
  createTaskDto: CreateTaskDto;
  setCreateTaskDto: React.Dispatch<React.SetStateAction<CreateTaskDto>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
