import React from "react";
import { Project, User } from "../../interface";
import { CreateProjectDto } from "../../api/dto";
import { useRouter } from "next/router";
import { Layout } from "../../components";
import { createProject, getMe, getProjects } from "../../api";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";

type Props = {
  user: User;
  projects: Project[];
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
                  const response = await createProject(createProjectDto);
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
  const cookie = context.req.headers.cookie;
  try {
    const getMeResponse = await getMe(cookie);
    const user = getMeResponse.data;
    delete user.hash;

    const getProjectsResponse = await getProjects(cookie);
    const projects = getProjectsResponse.data;

    return { props: { user, projects } };
  } catch (error) {
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
  }

  return { props: {} };
};

export default Dashboard;
