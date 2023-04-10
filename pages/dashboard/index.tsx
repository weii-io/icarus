import React from "react";
import { Project, User } from "../../interface";
import { useRouter } from "next/router";
import { Layout } from "../../components";
import {
  createProject,
  deleteGithubProfile,
  getGithubOrganizationRepositories,
  getMe,
  getProjects,
  getUserGithubOrganization,
  getUserGithubRepositories,
  logoutUser,
} from "../../services";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { ProtectedRouteMiddleware } from "../../middleware";
import { CreateProject } from "../../components/dashboard";
import { CreateProjectDto } from "../../services/dto";
import Popup from "../../components/Popup";

type Props = {
  user: User;
  projects: Project[];
  cookie: string | undefined;
  userGithubRepositories?: any[];
};

function Dashboard(props: Props) {
  const router = useRouter();
  const popup = React.useRef<HTMLDialogElement>(null);
  const [popupContent, setPopupContent] = React.useState<React.ReactNode>();
  return (
    <Layout>
      <Popup elementRef={popup} content={popupContent} />
      <aside>
        <p>Welcome, {props.user.username}</p>
        <ul>
          <li>Projects</li>
          <li>Tasks</li>
          <li>Setting</li>
        </ul>
        <button
          onClick={async () => {
            const response = await logoutUser(props.cookie);
            router.reload();
          }}
        >
          logout
        </button>
        {props.user.githubProfile ? (
          <button
            onClick={async () => {
              const response = await deleteGithubProfile(props.cookie);
              if (!response.ok) {
                // show popup
                popup.current?.showModal();
                // prompt the dialog box to tell user that there is project currently being connected to the github profile
                // user needs to delete the project first before disconnecting the github profile
                setPopupContent(
                  <div>
                    <p>
                      You have project(s) currently connected to your github
                      profile. Please delete the project(s) first before
                      disconnecting your github profile.
                    </p>
                  </div>
                );
              }
              // router.reload();
            }}
          >
            disconnect from github
          </button>
        ) : (
          // TODO: change link to button for security purpose
          <button>
            <Link
              href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
            >
              connect to github
            </Link>
          </button>
        )}
      </aside>
      <section>
        <div>
          <h1>Projects</h1>
          <CreateProject
            formSubmitHandler={(payload: CreateProjectDto) =>
              createProject(props.cookie, payload)
            }
            userGithubRepositories={props.userGithubRepositories}
            githubProfile={props.user.githubProfile}
          />
          <div>
            {props.projects.map((project) => {
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
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  /** middleware */
  const protectedRouteMiddleware = await ProtectedRouteMiddleware(context);
  if (protectedRouteMiddleware.redirect) {
    return protectedRouteMiddleware;
  }

  /** logic */
  const cookie = context.req.headers.cookie;
  const getMeResponse = await getMe(cookie);
  const me = await getMeResponse.json();
  delete me.hash;

  const getProjectsResponse = await getProjects(cookie);
  const projects = await getProjectsResponse.json();

  if (me.githubProfile) {
    // if user have a github profile
    // get all the repos
    const getUserGithubRepositoriesResponse = await getUserGithubRepositories(
      me
    );
    const userGithubRepositories =
      await getUserGithubRepositoriesResponse.json();
    const getUserGithubOrganizationResponse = await getUserGithubOrganization(
      me
    );
    const userGithubOrganizations =
      await getUserGithubOrganizationResponse.json();

    // reference: https://stackoverflow.com/a/37576787
    const organizationRepositories = await Promise.all(
      userGithubOrganizations.map(async (organization: any) => {
        const getGithubOrganizationRepositoriesResponse =
          await getGithubOrganizationRepositories(organization.login, me);
        const githubOrganizationRepositories =
          await getGithubOrganizationRepositoriesResponse.json();
        return githubOrganizationRepositories;
      })
    );

    return {
      props: {
        user: me,
        projects: projects,
        cookie: context.req.headers.cookie,
        userGithubRepositories: [
          ...userGithubRepositories,
          ...organizationRepositories.flat(),
        ],
      },
    };
  }

  return {
    props: {
      user: me,
      projects: projects,
      cookie: context.req.headers.cookie,
    },
  };
};

export default Dashboard;
