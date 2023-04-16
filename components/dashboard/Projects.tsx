import Link from "next/link";
import {
  createProjectApi,
  getMeApi,
  getProjectsApi,
  getUserGithubRepositoriesApi,
} from "../../server";
import { CreateProjectDto } from "../../server/dto";
import { CreateProject } from "./CreateProject";
import React, { useContext } from "react";
import { Project } from "../../interface";
import { DashboardContext } from "../../context";

type Props = {};

export const Projects: React.FC<Props> = (prosp: Props) => {
  const [userGithubRepositories, setUserGithubRepositories] = React.useState<
    any[]
  >([]);

  const { user } = useContext(DashboardContext);

  const [projects, setProjects] = React.useState<Project[]>([]);

  const initProjectState = React.useCallback(async () => {
    const getProjectsResponse = await getProjectsApi();
    const projects = await getProjectsResponse.json();
    setProjects(projects);
  }, []);

  const initUserRepositoriesState = React.useCallback(async () => {
    if (user) {
      const getUserGithubRepositoriesResponse =
        await getUserGithubRepositoriesApi(user);
      const userGithubRepositories =
        await getUserGithubRepositoriesResponse.json();
      setUserGithubRepositories(userGithubRepositories);
    }
  }, [user]);

  React.useEffect(() => {
    initProjectState();
  }, [initProjectState]);

  React.useEffect(() => {
    initUserRepositoriesState();
  }, [initUserRepositoriesState]);

  return (
    <div>
      <h1>Projects</h1>

      {user && projects ? (
        <>
          <CreateProject
            createProjectApi={(payload: CreateProjectDto) =>
              createProjectApi(payload)
            }
            userGithubRepositories={userGithubRepositories}
            githubProfile={user.githubProfile}
          />
          <div>
            {projects.map((project) => {
              return (
                <div key={project.id}>
                  <Link href={`/dashboard/projects/${project.id}`}>
                    <h2>{project.name}</h2>
                  </Link>
                  <p>{project.description || "no description"}</p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};
