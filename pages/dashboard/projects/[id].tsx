import React from "react";
import { Project, Task } from "../../../interface";
import { CreateTaskDto } from "../../../server/dto";
import { useRouter } from "next/router";
import Link from "next/link";
import { createTaskApi, getProjectByIdApi, getTasksApi } from "../../../server";

type Props = {
  project: Project;
  tasks: Task[];
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
              const createTaskResponse = await createTaskApi(createTaskDto);
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
      {props.project.githubRepoSlug && (
        <div>
          <h2>
            {`connected to `}
            <Link
              target="_blank"
              href={`https://github.com/${
                props.project.githubRepoSlug.split(
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
              <h3>{task.name}</h3>
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
  const { req } = context;
  const getProjectByIdReponse = await getProjectByIdApi(
    context.params.id,
    req.headers.cookie
  );
  if (!getProjectByIdReponse.ok) {
    return {
      notFound: true,
    };
  }
  const project = await getProjectByIdReponse.json();
  const getTasksResponse = await getTasksApi(project.id, req.headers.cookie);
  const tasks = await getTasksResponse.json();
  return {
    props: {
      project: project,
      tasks: tasks,
    },
  };
};

export default Project;
