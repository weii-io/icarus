import React from "react";
import { IGithubFileTreesContext } from "./interface";
export const GithubFileTreesContext =
  React.createContext<IGithubFileTreesContext | null>(null);
