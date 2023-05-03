import React from "react";
import { TSettingsContext } from "./type";

export const SettingsContext = React.createContext<TSettingsContext | null>(
  null
);
