import { Branch, User } from "../interface";
import { CreateTaskDto, CreateProjectDto } from "../server/dto";

export type TDashbaordContext = {
  user: User | undefined;
};

export type TSettingsContext = {
  user: User;
  dialog: React.RefObject<HTMLDialogElement>;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
};

export type TProjectsContext = {
  userGithubRepositories: any[];
  user: User;
};

export type TCreateProjectContext = {
  createProjectDto: CreateProjectDto;
  setCreateProjectDto: React.Dispatch<React.SetStateAction<CreateProjectDto>>;
  onChangeRepositorySelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type TCreateTaskContext = {
  createTaskDto: CreateTaskDto;
  setCreateTaskDto: React.Dispatch<React.SetStateAction<CreateTaskDto>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type TGithubFileTreesContext = {
  directory: Branch[];
  setDirectory: React.Dispatch<React.SetStateAction<Branch[]>>;
  blob: string;
};
