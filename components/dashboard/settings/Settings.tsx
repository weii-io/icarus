import { User } from "../../../interface";
import Dialog from "../../Dialog";
import React from "react";
import { DashboardContext, SettingsContext } from "../../../context";
import { Account } from "./Account";

type Props = {};

export const Settings: React.FC<Props> = (props: Props) => {
  const dialog = React.useRef<HTMLDialogElement>(null);
  const [dialogContent, setDialogContent] = React.useState<React.ReactNode>();
  const { user } = React.useContext(DashboardContext);

  return (
    <>
      <SettingsContext.Provider
        value={{
          user: user as User,
          dialog: dialog,
          setDialogContent: setDialogContent,
        }}
      >
        <Dialog elementRef={dialog} content={dialogContent} />
        {user && <Account />}
      </SettingsContext.Provider>
    </>
  );
};
