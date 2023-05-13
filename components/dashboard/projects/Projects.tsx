import Link from "next/link";
import React from "react";
import { DashboardContext, ProjectsContext } from "../../../context";
import { Project, User } from "../../../interface";
import {
  getGithubOrganizationRepositoriesApi,
  getProjectsApi,
  getUserGithubOrganizationsApi,
  getUserGithubRepositoriesApi,
} from "../../../service";
import styles from "./Projects.module.css";
import { Card } from "../../card";
import { Icon } from "../../Icon";
import { Button } from "../../button";
import { CreateProjectWrapper } from "./CreateProjectWrapper";

type Props = {};

export const Projects: React.FC<Props> = (props: Props) => {
  const [userGithubRepositories, setUserGithubRepositories] = React.useState<
    any[]
  >([]);

  const { user } = React.useContext(DashboardContext);

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
        await getUserGithubRepositoriesApi(user.githubProfile);
      const userGithubRepositories =
        await getUserGithubRepositoriesResponse.json();

      // get user organization github repositories
      const getUserGithubOrganizationsResponse =
        await getUserGithubOrganizationsApi(user.githubProfile);
      const userGithubOrganizations =
        await getUserGithubOrganizationsResponse.json();

      // map through userGithubOrganizations and get repositories
      const userGithubOrganizationsRepositories = await Promise.all(
        userGithubOrganizations.map(async (organization: any) => {
          const getUserGithubOrganizationRepositoriesResponse =
            await getGithubOrganizationRepositoriesApi(
              user.githubProfile,
              organization.login
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
    <ProjectsContext.Provider
      value={{
        userGithubRepositories: userGithubRepositories,
        user: user as User,
      }}
    >
      <div role="contentinfo">
        <nav className={styles.nav}>
          <h1>Projects</h1>
          {user && userGithubRepositories && <CreateProjectWrapper />}
        </nav>
        {user && projects && (
          <div className={styles.projects} role="contentinfo">
            {projects.map((project) => {
              return (
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
                    <Link
                      style={{ marginTop: "1rem" }}
                      href={`/dashboard/projects/${project.id}?tab=about`}
                    >
                      <Button.Secondary
                        style={{
                          borderRadius: "4px",
                        }}
                      >
                        View Project
                      </Button.Secondary>
                    </Link>
                  </Card.Cta>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </ProjectsContext.Provider>
  );
};
