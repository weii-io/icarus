import React from "react";
import { ICreateTaskContext } from "./interface";

export const CreateTaskContext = React.createContext<ICreateTaskContext | null>(
  null
);
