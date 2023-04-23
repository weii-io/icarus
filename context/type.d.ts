import { User } from "../interface";

export type TDashbaordContext = {
  user: User | undefined;
};

export type TSettingsContext = {
  user: User;
  dialog: React.RefObject<HTMLDialogElement>;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
};
