import { GetServerSidePropsContext } from "next";
import { getMe } from "../services";

export const PublicRouteMiddleware = async (
  getServerSidePropsContext: GetServerSidePropsContext
) => {
  const { req } = getServerSidePropsContext;
  const getMeResponse = await getMe(req.headers.cookie);
  // user is authorized
  if (getMeResponse.ok)
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  return {};
};
