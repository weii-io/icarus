import { useRouter } from "next/router";
import { SettingsContext } from "../../../context";
import { TSettingsContext } from "../../../context/type";
import React from "react";
import { Button } from "../../button";
import { deleteGithubProfileApi } from "../../../server";
import { Icon } from "../../Icon";

export const Account = () => {
  const router = useRouter();
  const { user, dialog, setDialogContent } = React.useContext(
    SettingsContext
  ) as TSettingsContext;
  return (
    <div>
      <h2>Account</h2>
      {user.githubProfile ? (
        // TODO: style this button
        <Button.Primary
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "fit-content",
            borderRadius: "4px",
          }}
          onClick={async () => {
            const response = await deleteGithubProfileApi();
            if (!response.ok) {
              // show popup
              dialog.current?.showModal();
              // prompt the dialog box to tell user that there is project currently being connected to the github profile
              // user needs to delete the project first before disconnecting the github profile
              setDialogContent(
                <div>
                  <p>
                    You have project(s) currently connected to your github
                    profile. Please delete the project(s) first before
                    disconnecting your github profile.
                  </p>
                </div>
              );
              return;
            }
            window.location.reload();
          }}
        >
          <Icon
            viewBox="0 0 24 24"
            width={20}
            height={20}
            strokeColor="none"
            strokeWidth={1.5}
            fillColor="white"
          >
            <Icon.Github></Icon.Github>
          </Icon>
          <span style={{ marginLeft: "1rem" }}>Disconnect from Github</span>
        </Button.Primary>
      ) : (
        // TODO: style this button
        <Button.Primary
          onClick={() =>
            router.push(
              `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`
            )
          }
        >
          Connect to Github
        </Button.Primary>
      )}
    </div>
  );
};
