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
import { Card } from "../card";
import { Button } from "../button";
import { Icon } from "../Icon";
import { ProjectDropdown } from "./ProjectDropdown";

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
        <div className={styles.projects} role="contentinfo">
          {projects.map((project) => {
            return (
              // TODO: change this whole chunk into cards component
              <Card style={{ backgroundColor: "black" }} key={project.id}>
                <Card.Heading>
                  <h2 style={{ fontWeight: 500 }}>{project.name}</h2>
                  {project.githubRepoSlug && (
                    <Link
                      style={{ width: "fit-content" }}
                      target="__blank"
                      href={`https://github.com/${project.githubRepoSlug}`}
                    >
                      <Icon
                        viewBox="0 0 24 24"
                        width={20}
                        height={20}
                        strokeColor="none"
                        strokeWidth={1.5}
                        fillColor="white"
                      >
                        <Icon.Github></Icon.Github>
                      </Icon>
                    </Link>
                  )}
                </Card.Heading>
                <Card.Cta>
                  <Button.Secondary
                    style={{
                      marginTop: "1rem",
                      borderRadius: "4px",
                    }}
                  >
                    <Link
                      // style={{ color: "white" }}
                      href={`/dashboard/projects/${project.id}`}
                    >
                      View Project
                    </Link>
                  </Button.Secondary>
                </Card.Cta>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
