import Link from "next/link";
import {
  getGithubOrganizationRepositoriesApi,
  getProjectsApi,
  getUserGithubOrganizationsApi,
  getUserGithubRepositoriesApi,
} from "../../server";
import { CreateProject } from "./CreateProject";
import React, { useContext } from "react";
import { Project } from "../../interface";
import { DashboardContext } from "../../context";
import styles from "./Projects.module.css";

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
    if (user && user?.githubProfile) {
      // get user personal github repositories
      const getUserGithubRepositoriesResponse =
        await getUserGithubRepositoriesApi(user);
      const userGithubRepositories =
        await getUserGithubRepositoriesResponse.json();

      // get user organization github repositories
      const getUserGithubOrganizationsResponse =
        await getUserGithubOrganizationsApi(user);
      const userGithubOrganizations =
        await getUserGithubOrganizationsResponse.json();

      // map through userGithubOrganizations and get repositories
      const userGithubOrganizationsRepositories = await Promise.all(
        userGithubOrganizations.map(async (organization: any) => {
          const getUserGithubOrganizationRepositoriesResponse =
            await getGithubOrganizationRepositoriesApi(
              organization.login,
              user
            );
          const userGithubOrganizationRepositories =
            await getUserGithubOrganizationRepositoriesResponse.json();

          return userGithubOrganizationRepositories;
        })
      );

      setUserGithubRepositories([
        ...userGithubRepositories,
        ...userGithubOrganizationsRepositories.flat(),
      ]);
    }
  }, [user]);

  React.useEffect(() => {
    Promise.all([initProjectState(), initUserRepositoriesState()]);
  }, [initProjectState, initUserRepositoriesState]);

  // capture event called project created
  React.useEffect(() => {
    const handleProjectCreated = () => initProjectState();
    window.addEventListener("project-created", handleProjectCreated);
    return () => {
      window.removeEventListener("project-created", handleProjectCreated);
    };
  }, [initProjectState]);

  return (
    <div role="contentinfo">
      <nav className={styles.nav}>
        <h1>Projects</h1>
        {user && userGithubRepositories && (
          <CreateProject
            userGithubRepositories={userGithubRepositories}
            githubProfile={user.githubProfile}
          />
        )}
      </nav>
      {user && projects && (
        <div role="contentinfo">
          {projects.map((project) => {
            return (
              // TODO: change this whole chunk into cards component
              <div key={project.id}>
                <Link href={`/dashboard/projects/${project.id}`}>
                  <h2>{project.name}</h2>
                </Link>
                <p>{project.description || "no description"}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
