import { GetServerSidePropsContext } from "next";
import React from "react";
import {
  createUserApi,
  getGoogleOAuthToken,
  getGoogleUserProfile,
  loginUserApi,
} from "../../../server";
import { GoogleProfile } from "../../../interface";
import { generateRandomPassword } from "../../../utils";

type Props = {};

function callback({}: Props) {
  return <></>;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { code } = context.query;
  const { access_token } = await getGoogleOAuthToken(code as string).then(
    (response) => response.json()
  );
  const {
    id: googleProfileId,
    email,
    name,
    given_name,
  } = (await getGoogleUserProfile(access_token).then((response) =>
    response.json()
  )) as GoogleProfile;

  const temporaryPassword = generateRandomPassword();
  const createUserResponse = await createUserApi({
    email: email,
    firstName: given_name,
    lastName: name,
    password: temporaryPassword,
    confirmPassword: temporaryPassword,
    googleProfileId: googleProfileId,
  });

  const loginUserResponse = await loginUserApi({
    email,
    password: temporaryPassword,
    googleProfileId: googleProfileId,
  });

  if (loginUserResponse.ok) {
    const setCookieHeader = loginUserResponse.headers
      .get("set-cookie")
      ?.split(", ") as readonly string[];
    context.res.setHeader("set-cookie", setCookieHeader);
  }

  return {
    redirect: {
      destination: "/dashboard?tab=settings",
      permanent: false,
    },
  };
};

export default callback;
