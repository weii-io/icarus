import { Button } from "../../button";
import React, { FormEvent } from "react";
import styles from "./Tasks.module.css";
import { Project } from "../../../interface";
import { CreateTaskDto } from "../../../service/dto";
import { CreateTaskContext } from "../../../context";
import { CreateTaskForm } from "./Form";
import { IcarusApiTaskService } from "../../../service/icarus-api/task";

type Props = {
  project?: Project;
};

export const CreateTaskDialog: React.FC<Props> = (props) => {
  const createTaskDialog = React.useRef<HTMLDialogElement>(null);
  const [createTaskDto, setCreateTaskDto] = React.useState<CreateTaskDto>({
    name: "",
    description: "",
    projectId: props.project?.id || -1,
    dueDate: undefined,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await new IcarusApiTaskService().createTask(createTaskDto);
      setCreateTaskDto({
        name: "",
        description: "",
        projectId: props.project?.id || -1,
        dueDate: undefined,
      });
      createTaskDialog.current?.close();
    } catch (context: any) {}
  };

  // TODO: update dialog to Dialog component
  return (
    <div>
      <Button.Secondary onClick={() => createTaskDialog.current?.showModal()}>
        Create new task
      </Button.Secondary>
      <dialog className={styles.dialog} ref={createTaskDialog}>
        <CreateTaskContext.Provider
          value={{
            createTaskDto,
            setCreateTaskDto,
            handleSubmit,
          }}
        >
          <CreateTaskForm />
        </CreateTaskContext.Provider>
        <Button.Secondary onClick={() => createTaskDialog.current?.close()}>
          Close
        </Button.Secondary>
      </dialog>
    </div>
  );
};
