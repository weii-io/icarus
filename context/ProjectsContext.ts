import React from "react";
import { TProjectsContext } from "./type";

export const ProjectsContext = React.createContext<TProjectsContext | null>(
  null
);
