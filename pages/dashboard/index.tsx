import React from "react";
import { Project, User } from "../../interface";
import { CreateProjectDto } from "../../api/dto";
import { useRouter } from "next/router";
import { Layout } from "../../components";
import { createProject, getMe, getProjects, logoutUser } from "../../api";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { ProtectedRouteMiddleware } from "../../middleware";

type Props = {
  user: User;
  projects: Project[];
  cookie: string | undefined;
};

function Dashboard(props: Props) {
  const createProjectDialog = React.useRef<HTMLDialogElement>(null);
  const [createProjectDto, setCreateProjectDto] =
    React.useState<CreateProjectDto>({
      name: "",
      description: "",
    });
  const createProjectForm = React.useRef<HTMLFormElement>(null);
  const resetCreateProjectDto = () => {
    setCreateProjectDto({
      name: "",
      description: "",
    });
    createProjectForm.current?.reset();
  };

  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

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
        {!props.user.githubProfile && (
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
                  const response = await createProject(
                    props.cookie,
                    createProjectDto
                  );
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
              <button type="submit">Create</button>
            </form>
            <button onClick={() => createProjectDialog.current?.close()}>
              close
            </button>
          </dialog>
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
  const user = getMeResponse.data;
  delete user.hash;

  const getProjectsResponse = await getProjects(cookie);
  const projects = getProjectsResponse.data;
  return {
    props: {
      user: user,
      projects: projects,
      cookie: context.req.headers.cookie,
    },
  };
};

export default Dashboard;
