import { CreateTaskContext } from "../../../context";
import React from "react";
import { TCreateTaskContext } from "../../../context/type";
import { CreateTaskDto } from "../../../service/dto";
import { Input } from "../../input";

export const CreateTaskForm = () => {
  const { setCreateTaskDto, handleSubmit, createTaskDto } = React.useContext(
    CreateTaskContext
  ) as TCreateTaskContext;

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCreateTaskDto((dto: CreateTaskDto) => ({
        ...dto,
        [name]: value,
      }));
    },
    [setCreateTaskDto]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Input.Text
        label="Task Name"
        name="taskName"
        id="taskName"
        autoComplete="off"
        required={true}
        onChange={handleInputChange}
        value={createTaskDto.name}
      />
      <Input.Text
        label="Task Description"
        name="taskDescription"
        id="taskDescription"
        autoComplete="off"
        required={true}
        onChange={handleInputChange}
        value={createTaskDto.description as string}
      />
      {/* TODO: create input subcomponent for date */}
      <label htmlFor="taskDueDate">Task Due Date</label>
      <input
        onChange={handleInputChange}
        type="date"
        name="taskDueDate"
        id="taskDueDate"
      />
      <button type="submit">Create</button>
    </form>
  );
};
