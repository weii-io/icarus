import React from "react";
import { Projects } from "./Projects";
import { Tasks } from "./Tasks";
import { Settings } from "./Settings";
import { IBaseTabProps } from "./interface";

type TSubComponents = {
  Projects: React.FC<IBaseTabProps>;
  Tasks: React.FC<IBaseTabProps>;
  Settings: React.FC<IBaseTabProps>;
};

export const Tab: TSubComponents = {
  Projects,
  Tasks,
  Settings,
};
