import React from "react";
import { Project, User } from "../../interface";
import { useRouter } from "next/router";
import { Layout } from "../../components";
import { deleteGithubProfile, getMe, getProjects, logoutUser } from "../../api";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { ProtectedRouteMiddleware } from "../../middleware";
import { CreateProject } from "../../components/dashboard";

type Props = {
  user: User;
  projects: Project[];
  cookie: string | undefined;
};

function Dashboard(props: Props) {
  const router = useRouter();

  return (
    <Layout>
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
              await deleteGithubProfile(props.cookie);
              // router.reload();
            }}
          >
            disconnect from github
          </button>
        ) : (
          <Link
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
          >
            connect to github
          </Link>
        )}
      </aside>
      <section>
        <div>
          <h1>Projects</h1>
          <CreateProject user={props.user} cookie={props.cookie} />
          <div>
            {props.projects.map((project) => {
              return (
                <div key={project.id}>
                  <Link href="/dashboard/projects/1">
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

  return {
    props: {
      user: me,
      projects: projects,
      cookie: context.req.headers.cookie,
    },
  };
};

export default Dashboard;
