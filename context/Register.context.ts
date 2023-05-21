import React from "react";
import { IRegisterContext } from "./interface";
export const RegisterContext = React.createContext<IRegisterContext | null>(
  null
);
