import React from "react";
import { Project, Task } from "../../../interface";
import { createTask, getProjectById, getTasks } from "../../../api";
import { CreateTaskDto } from "../../../api/dto";
import { useRouter } from "next/router";
import { ProtectedRouteMiddleware } from "../../../middleware";
import { setCookie } from "nookies";
import Link from "next/link";

type Props = {
  project: Project;
  tasks: Task[];
  cookie: string | undefined;
};

function Project(props: Props) {
  const createTaskDialog = React.useRef<HTMLDialogElement>(null);
  const [createTaskDto, setCreateTaskDto] = React.useState<CreateTaskDto>({
    name: "",
    description: "",
    projectId: props.project.id,
  });
  const createTaskForm = React.useRef<HTMLFormElement>(null);
  const resetCreateTaskDto = () => {
    setCreateTaskDto({
      name: "",
      description: "",
      projectId: props.project.id,
      dueDate: undefined,
    });
    createTaskForm.current?.reset();
  };

  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const router = useRouter();

  return (
    <div>
      <button onClick={() => createTaskDialog.current?.showModal()}>
        create task
      </button>
      <dialog ref={createTaskDialog}>
        {showError && <p>{errorMessage}</p>}
        <form
          ref={createTaskForm}
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const response = await createTask(props.cookie, createTaskDto);
              resetCreateTaskDto();
              createTaskDialog.current?.close();
              router.replace(router.asPath);
            } catch (context: any) {
              console.log(context);
              setShowError(true);
              setErrorMessage("Unable to create task");
            }
          }}
        >
          <label htmlFor="taskName">Task Name</label>
          <input
            onChange={(e) => {
              setCreateTaskDto((dto) => {
                return { ...dto, name: e.target.value };
              });
            }}
            required
            type="text"
            name="taskName"
            id="taskName"
          />
          <label htmlFor="taskDescription">Task Description</label>
          <input
            onChange={(e) => {
              setCreateTaskDto((dto) => {
                return { ...dto, description: e.target.value };
              });
            }}
            type="text"
            name="taskDescription"
            id="taskDescription"
          />
          <label htmlFor="taskDueDate">Task Due Date</label>
          <input
            onChange={(e) => {
              setCreateTaskDto((dto) => {
                return {
                  ...dto,
                  dueDate: new Date(e.target.value),
                };
              });
            }}
            type="date"
            name="taskDueDate"
            id="taskDueDate"
          />
          <button type="submit">Create</button>
        </form>
        <button onClick={() => createTaskDialog.current?.close()}>close</button>
      </dialog>
      <h1>{props.project.name}</h1>
      {props.project.githubRepoUrl && (
        <div>
          <h2>
            {`connected to `}
            <Link
              target="_blank"
              href={`https://github.com/${
                props.project.githubRepoUrl.split(
                  "https://api.github.com/repos/"
                )[1]
              }`}
            >
              github
            </Link>
          </h2>
        </div>
      )}
      <p>{props.project.description || "no description"}</p>
      <div>
        <h2>tasks</h2>
        <ul>
          {props.tasks.map((task) => (
            <li key={task.id}>
              <p>{task.name}</p>
              <p>{task.description}</p>
              <p>
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      timeZone: "UTC",
                    })
                  : "no due date"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  /** middleware */
  const protectedRouteMiddleware = await ProtectedRouteMiddleware(context);
  if (protectedRouteMiddleware.redirect) {
    return protectedRouteMiddleware;
  }

  const { req } = context;
  const getProjectByIdReponse = await getProjectById(
    req.headers.cookie,
    context.params.id
  );
  if (!getProjectByIdReponse.ok) {
    return {
      notFound: true,
    };
  }
  const project = await getProjectByIdReponse.json();
  const getTasksResponse = await getTasks(req.headers.cookie, project.id);
  const tasks = await getTasksResponse.json();
  return {
    props: {
      project: project,
      tasks: tasks,
      cookie: req.headers.cookie,
    },
  };
};

export default Project;
