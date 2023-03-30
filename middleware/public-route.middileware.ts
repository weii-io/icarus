import { GetServerSidePropsContext } from "next";
import { getMe } from "../api";

export const PublicRouteMiddleware = async (
  getServerSidePropsContext: GetServerSidePropsContext
) => {
  try {
    const { req } = getServerSidePropsContext;
    const response = await getMe(req.headers.cookie);
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  } catch (error) {
    return {};
  }
};
