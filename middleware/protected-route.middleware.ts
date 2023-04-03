import { GetServerSidePropsContext } from "next";
import { getMe } from "../api";

export const ProtectedRouteMiddleware = async (
  getServerSidePropsContext: GetServerSidePropsContext
) => {
  const { req } = getServerSidePropsContext;
  const getMeResponse = await getMe(req.headers.cookie);
  // user is not authorized
  if (!getMeResponse.ok)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  return {};
};
