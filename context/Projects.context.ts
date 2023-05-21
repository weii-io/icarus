import React from "react";
import { IProjectsContext } from "./interface";

export const ProjectsContext = React.createContext<IProjectsContext | null>(
  null
);
