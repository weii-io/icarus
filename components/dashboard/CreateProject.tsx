import React from "react";
import { CreateProjectDto } from "../../api/dto";
import { useRouter } from "next/router";
import { GithubProfile } from "../../interface";
import { refreshPage } from "../../utils";

type Props = {
  userGithubRepositories?: any[];
  formSubmitHandler: (dto: CreateProjectDto) => Promise<Response>;
  githubProfile: GithubProfile;
};

export const CreateProject: React.FC<Props> = (props: Props) => {
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const router = useRouter();

  const createProjectForm = React.useRef<HTMLFormElement>(null);
  const createProjectDialog = React.useRef<HTMLDialogElement>(null);

  const [createProjectDto, setCreateProjectDto] =
    React.useState<CreateProjectDto>({
      name: "",
      description: "",
      githubProfileId: undefined,
      githubRepoUrl: undefined,
    });

  const resetForm = React.useCallback(() => {
    // clear all the input in the form
    createProjectForm.current?.reset();
    // reset the state
    setCreateProjectDto({
      name: "",
      description: "",
      githubProfileId: undefined,
      githubRepoUrl: undefined,
    });
  }, []);

  const onChangeRepositorySelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.value === "") {
      setCreateProjectDto((dto) => {
        return {
          ...dto,
          githubRepoUrl: undefined,
        };
      });
      return;
    }

    const selectedRepo = props.userGithubRepositories?.find(
      (repo) => repo.url === e.target.value
    );

    if (selectedRepo) {
      setCreateProjectDto((dto) => {
        return {
          ...dto,
          name: selectedRepo.name,
          description: selectedRepo.description,
          githubRepoUrl: selectedRepo.url,
        };
      });
    }
  };

  return (
    <div>
      <button onClick={() => createProjectDialog.current?.showModal()}>
        create new project
      </button>
      <dialog ref={createProjectDialog}>
        {showError && <p>{errorMessage}</p>}
        <form
          ref={createProjectForm}
          onSubmit={async (e) => {
            e.preventDefault();
            const createProjectResponse = await props.formSubmitHandler({
              ...createProjectDto,
              githubProfileId: props.githubProfile.id,
            });
            if (!createProjectResponse.ok) {
              setShowError(true);
              setErrorMessage("Unable to create project");
              return;
            }
            resetForm();
            createProjectDialog.current?.close();
            refreshPage(router);
          }}
        >
          <label htmlFor="projectName">Project Name</label>
          <input
            onChange={(e) => {
              setCreateProjectDto((dto) => {
                return { ...dto, name: e.target.value };
              });
            }}
            required
            type="text"
            name="projectName"
            id="projectName"
          />
          <label htmlFor="projectDescription">Project Description</label>
          <input
            onChange={(e) => {
              setCreateProjectDto((dto) => {
                return { ...dto, description: e.target.value };
              });
            }}
            type="text"
            name="projectDescription"
            id="projectDescription"
          />
          {props.userGithubRepositories && (
            <div>
              <h1>connect your github repository</h1>
              <select onChange={onChangeRepositorySelect}>
                <option value="">select a repository</option>
                {props.userGithubRepositories.map((repo) => {
                  return (
                    <option key={repo.name} value={repo.url}>
                      {repo.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          <button type="submit">Create</button>
        </form>
        <button onClick={() => createProjectDialog.current?.close()}>
          close
        </button>
      </dialog>
    </div>
  );
};
