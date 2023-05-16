import React from "react";
import { ICreateProjectContext } from "./interface";

export const CreateProjectContext =
  React.createContext<ICreateProjectContext | null>(null);
