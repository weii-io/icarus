import React from "react";
import { TCreateTaskContext } from "./type";

export const CreateTaskContext = React.createContext<TCreateTaskContext | null>(
  null
);
