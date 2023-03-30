import { GetServerSidePropsContext } from "next";
import React from "react";
import { createGithubProfile, getGithubAccessToken } from "../../../api";

type Props = {};

function callback({}: Props) {
  return <></>;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { code } = context.query;

  const { data } = await getGithubAccessToken(code as string);
  if (data.error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const { access_token } = data;

  const response = await createGithubProfile(
    context.req.headers.cookie,
    access_token
  );
  console.log(response);

  return {
    props: {},
  };
};

export default callback;
