import React from "react";
import { CreateProjectDto } from "../../api/dto";
import { useRouter } from "next/router";
import { createProject, getUserGithubRepositories } from "../../api";
import { User } from "../../interface";

type Props = {
  cookie: string | undefined;
  user: User;
};

export const CreateProject: React.FC<Props> = (props: Props) => {
  const createProjectDialog = React.useRef<HTMLDialogElement>(null);
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const createProjectForm = React.useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [createProjectDto, setCreateProjectDto] =
    React.useState<CreateProjectDto>({
      name: "",
      description: "",
    });

  const resetCreateProjectDto = () => {
    setCreateProjectDto({
      name: "",
      description: "",
    });
  };

  const [userGithubRepositories, setUserGithubRepositories] = React.useState<
    any[]
  >([]);

  React.useEffect(() => {
    if (props.user.githubProfile) {
      // TODO: factorize this
      getUserGithubRepositories(props.user).then((response) => {
        if (!response.ok) {
          setErrorMessage("Unable to fetch github repositories");
          setShowError(true);
        }

        response.json().then((data) => {
          setUserGithubRepositories(data);
        });
      });
    }
  }, [props]);

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
            try {
              await createProject(props.cookie, createProjectDto);
              resetCreateProjectDto();
              createProjectDialog.current?.close();
              router.replace(router.asPath);
            } catch (context: any) {
              setShowError(true);
              setErrorMessage("Unable to create project");
            }
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
          {props.user.githubProfile && (
            <div>
              <h1>connect your github repository</h1>
              <select
              // onChange={(e) => {
              //   const selectedRepo = userGithubRepositories.find(
              //     (repo) => repo.id === parseInt(e.target.value)
              //   );
              //   if (selectedRepo) {
              //     setCreateProjectDto((dto) => {
              //       return {
              //         ...dto,
              //         name: selectedRepo.name,
              //         description: selectedRepo.description,
              //         githubRepoUrl: selectedRepo.url,
              //       };
              //     });
              //   }
              // }}
              >
                <option value="">select a repository</option>
                {userGithubRepositories.map((repo) => {
                  return (
                    <option key={repo.id} value={repo.id}>
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
