import React from "react";
import { CreateProjectDto } from "../../server/dto";
import { GithubProfile } from "../../interface";
import { CreateProjectForm } from "./CreateProjectForm";
import { createProjectApi } from "../../server";
import { Button } from "../button";
import styles from "./Projects.module.css";
import { useRouter } from "next/router";

type CreateProjectProps = {
  userGithubRepositories?: any[];
  githubProfile: GithubProfile;
};

export const CreateProject: React.FC<CreateProjectProps> = ({
  userGithubRepositories,
  githubProfile,
}) => {
  const createProjectForm = React.useRef<HTMLFormElement>(null);
  const createProjectDialog = React.useRef<HTMLDialogElement>(null);
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
      const createProjectResponse = await createProjectApi({
        ...createProjectDto,
        githubProfileId: githubProfile?.id || undefined,
      });
      if (!createProjectResponse.ok) {
        const createProject = await createProjectResponse.json();
        return;
      }

      dispatchEvent(new CustomEvent("project-created"));
      createProjectDialog.current?.close();
      resetForm();
    },
    [createProjectDto, githubProfile, resetForm]
  );

  return (
    <div>
      <Button.Secondary
        onClick={() => createProjectDialog.current?.showModal()}
      >
        Create new project
      </Button.Secondary>
      <dialog className={styles.dialog} ref={createProjectDialog}>
        <CreateProjectForm
          createProjectDto={createProjectDto}
          setCreateProjectDto={setCreateProjectDto}
          userGithubRepositories={userGithubRepositories}
          onChangeRepositorySelect={onChangeRepositorySelect}
          handleSubmit={handleSubmit}
        />
        <Button.Secondary onClick={() => createProjectDialog.current?.close()}>
          Close
        </Button.Secondary>
      </dialog>
    </div>
  );
};
