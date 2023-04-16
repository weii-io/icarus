import React from "react";
import { TDashbaordContext } from "./type";

// create dashboard context
export const DashboardContext = React.createContext<TDashbaordContext>({
  user: undefined,
});
