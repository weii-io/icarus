import { useRouter } from "next/router";
import { SettingsContext } from "../../../context";
import React from "react";
import { Button } from "../../button";
import { Icon } from "../../Icon";
import { ISettingsContext } from "../../../context/interface";
import { IcarusApiGithubProfileService } from "../../../service/icarus-api/github-profile";

export const Account = () => {
  return (
    <div>
      <h2>Account</h2>
      <br />
      <Github />
    </div>
  );
};

// const Google = () => {
//   const { user } = React.useContext(SettingsContext) as TSettingsContext;
//   if (user.googleProfileId)
//     return (
//       <Button.Primary
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Icon
//           viewBox="0 0 48 48"
//           width={20}
//           height={20}
//           strokeColor="none"
//           strokeWidth={1.5}
//           fillColor="none"
//         >
//           <Icon.GoogleColor />
//         </Icon>
//         <span style={{ marginLeft: "1rem" }}>Connected to Google</span>
//       </Button.Primary>
//     );

//   return <></>;
// };

const Github = () => {
  const { user, dialog, setDialogContent } = React.useContext(
    SettingsContext
  ) as ISettingsContext;
  const router = useRouter();

  if (user.githubProfile)
    return (
      <Button.Primary
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={async () => {
          const response =
            await new IcarusApiGithubProfileService().deleteGithubProfile();
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
    );

  return (
    <Button.Primary
      onClick={() =>
        router.push(
          `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`
        )
      }
    >
      Connect to Github
    </Button.Primary>
  );
};
