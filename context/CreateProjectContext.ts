import React from "react";
import { TCreateProjectContext } from "./type";

export const CreateProjectContext =
  React.createContext<TCreateProjectContext | null>(null);
