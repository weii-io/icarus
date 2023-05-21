import React from "react";
import { CreateProjectDto } from "../../service/dto";

export interface ICreateProjectContext {
  createProjectDto: CreateProjectDto;
  setCreateProjectDto: React.Dispatch<React.SetStateAction<CreateProjectDto>>;
  onChangeRepositorySelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
