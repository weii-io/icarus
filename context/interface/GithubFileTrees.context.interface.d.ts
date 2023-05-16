import React from "react";
import { Branch } from "../../interface";

export interface IGithubFileTreesContext {
  directory: Branch[];
  setDirectory: React.Dispatch<React.SetStateAction<Branch[]>>;
  blob: string;
}
