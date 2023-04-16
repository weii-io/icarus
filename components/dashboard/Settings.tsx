import Link from "next/link";
import { User } from "../../interface";
import { deleteGithubProfileApi, getMeApi, logoutUserApi } from "../../server";
import Dialog from "../Dialog";
import React from "react";
import nookies from "nookies";
import { DashboardContext } from "../../context";

type Props = {};

export const Settings: React.FC<Props> = (props: Props) => {
  const dialog = React.useRef<HTMLDialogElement>(null);
  const [dialogContent, setDialogContent] = React.useState<React.ReactNode>();
  const { user } = React.useContext(DashboardContext);

  return (
    <>
      <Dialog elementRef={dialog} content={dialogContent} />
      {user ? (
        <>
          <div>
            <button
              onClick={async () => {
                const logoutUserResponse = await logoutUserApi();
                window.location.reload();
              }}
            >
              logout
            </button>
            {user.githubProfile ? (
              <button
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
                  }
                  window.location.reload();
                }}
              >
                disconnect from github
              </button>
            ) : (
              // TODO: change link to button for security purpose
              <button>
                <Link
                  href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
                >
                  connect to github
                </Link>
              </button>
            )}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
