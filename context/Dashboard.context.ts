import React from "react";
import { IDashboardContext } from "./interface";

// create dashboard context
export const DashboardContext = React.createContext<IDashboardContext>({
  user: undefined,
});
