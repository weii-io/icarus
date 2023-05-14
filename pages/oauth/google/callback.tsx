import { GetServerSidePropsContext } from "next";
import React from "react";

import { GoogleProfile } from "../../../interface";
import { GoogleOAuthApiService } from "../../../service/google";
import { IcarusApiAuthService } from "../../../service/icarus-api/auth";

type Props = {};

function callback({}: Props) {
  return <></>;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { code } = context.query;
  const { access_token } = await new GoogleOAuthApiService()
    .getAccessToken(code as string)
    .then((response) => response.json());
  const {
    id: googleProfileId,
    email,
    name,
    given_name,
  } = (await new GoogleOAuthApiService()
    .getUserInfo(access_token)
    .then((response) => response.json())) as GoogleProfile;

  await new IcarusApiAuthService().register({
    email: email,
    firstName: given_name,
    lastName: name,
    password: `${process.env.NEXT_PUBLIC_TEMPORARY_PASSWORD_SIGNATURE}${googleProfileId}`,
    confirmPassword: `${process.env.NEXT_PUBLIC_TEMPORARY_PASSWORD_SIGNATURE}${googleProfileId}`,
    googleProfileId: googleProfileId,
  });

  const loginUserResponse = await new IcarusApiAuthService().login({
    email,
    // can pass any string in here as long as it fits the criteria for strong password
    password: `${process.env.NEXT_PUBLIC_TEMPORARY_PASSWORD_SIGNATURE}${googleProfileId}`,
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
