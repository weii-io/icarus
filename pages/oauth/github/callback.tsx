import { GetServerSidePropsContext } from "next";
import React from "react";
import { GithubApiService } from "../../../service/github";
import { IcarusApiGithubProfileService } from "../../../service/icarus-api/github-profile";

type Props = {};

function callback({}: Props) {
  return <></>;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { code } = context.query;
  const getGithubAccessTokenResponse = await new GithubApiService(
    ""
  ).getAccessToken(code as string);

  if (!getGithubAccessTokenResponse.ok) {
    // set cookie error message unable to connect to github, please contact me@weii.io
    console.log("get github access token error");
  }

  const { access_token } = await getGithubAccessTokenResponse.json();

  const createGithubProfileResponse =
    await new IcarusApiGithubProfileService().createGithubProfile(
      access_token,
      context.req.headers.cookie as string
    );

  if (!createGithubProfileResponse.ok) {
    console.log(createGithubProfileResponse);
    // set cookie error message unable to connect to github, please contact me@weii.io
    console.log("create github profile error");
  }

  return {
    redirect: {
      destination: "/dashboard?tab=settings",
      permanent: false,
    },
  };
};

export default callback;
