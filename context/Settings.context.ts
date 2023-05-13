import React from "react";
import { ISettingsContext } from "./interface";

export const SettingsContext = React.createContext<ISettingsContext | null>(
  null
);
