import { GetServerSidePropsContext } from "next";
import React from "react";
import {
  createGithubProfileApi,
  getGithubAccessTokenApi,
} from "../../../server";

type Props = {};

function callback({}: Props) {
  return <></>;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { code } = context.query;

  const getGithubAccessTokenResponse = await getGithubAccessTokenApi(
    code as string
  );

  if (!getGithubAccessTokenResponse.ok) {
    console.log("get github access token error");
    // return {
    //   redirect: {
    //     destination: "/",
    //     permanent: false,
    //   },
    // };
  }

  const { access_token } = await getGithubAccessTokenResponse.json();

  const createGithubProfileResponse = await createGithubProfileApi(
    access_token,
    context.req.headers.cookie as string
  );

  if (!createGithubProfileResponse.ok) {
    console.log("create github profile error");
    // return {
    //   redirect: {
    //     destination: "/",
    //     permanent: false,
    //   },
    // };
  }

  return {
    redirect: {
      destination: "/dashboard",
      permanent: false,
    },
  };

  return {
    props: {},
  };
};

export default callback;
