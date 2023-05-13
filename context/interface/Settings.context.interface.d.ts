import React from "react";
import { User } from "../../interface";

export interface ISettingsContext {
  user: User;
  dialog: React.RefObject<HTMLDialogElement>;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}
