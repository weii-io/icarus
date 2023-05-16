import React from "react";
import { CreateProjectDto } from "../../../service/dto";
import { CreateProjectForm } from "./Form";
import { Button } from "../../button";
import { ProjectsContext } from "../../../context";
import styles from "./Projects.module.css";
import { CreateProjectContext } from "../../../context/CreateProject.context";
import { IProjectsContext } from "../../../context/interface";
import { IcarusApiProjectService } from "../../../service/icarus-api/project";

export const CreateProjectDialog: React.FC = ({}) => {
  const createProjectForm = React.useRef<HTMLFormElement>(null);
  const createProjectDialog = React.useRef<HTMLDialogElement>(null);

  const { userGithubRepositories, user } = React.useContext(
    ProjectsContext
  ) as IProjectsContext;

  const [createProjectDto, setCreateProjectDto] =
    React.useState<CreateProjectDto>({
      name: "",
      description: "",
      githubRepoSlug: undefined,
    });

  const resetForm = React.useCallback(() => {
    createProjectForm.current?.reset();
    setCreateProjectDto({
      name: "",
      description: "",
      githubRepoSlug: undefined,
    });
  }, [createProjectForm, setCreateProjectDto]);

  const onChangeRepositorySelect = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedRepo = userGithubRepositories?.find(
        (repo) => repo.full_name === e.target.value
      );

      setCreateProjectDto((dto) => ({
        ...dto,
        name: selectedRepo?.name || "",
        description: selectedRepo?.description || "",
        githubRepoSlug: selectedRepo?.full_name,
      }));
    },
    [setCreateProjectDto, userGithubRepositories]
  );

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      const createProjectResponse =
        await new IcarusApiProjectService().createProject({
          ...createProjectDto,
          githubProfileId: user.githubProfile?.id || undefined,
        });
      if (!createProjectResponse.ok) {
        const createProject = await createProjectResponse.json();
        return;
      }
      dispatchEvent(new CustomEvent("project-created"));
      createProjectDialog.current?.close();
      resetForm();
    },
    [createProjectDto, user, resetForm]
  );

  // TODO: update dialog to Dialog component
  return (
    <div>
      <Button.Secondary
        onClick={() => createProjectDialog.current?.showModal()}
      >
        Create new project
      </Button.Secondary>
      <dialog className={styles.dialog} ref={createProjectDialog}>
        <CreateProjectContext.Provider
          value={{
            createProjectDto,
            setCreateProjectDto,
            onChangeRepositorySelect,
            handleSubmit,
          }}
        >
          <CreateProjectForm />
        </CreateProjectContext.Provider>
        <Button.Secondary onClick={() => createProjectDialog.current?.close()}>
          Close
        </Button.Secondary>
      </dialog>
    </div>
  );
};
