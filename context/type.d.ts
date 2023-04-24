import { User } from "../interface";

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
