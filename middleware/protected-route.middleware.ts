import { GetServerSidePropsContext } from "next";
import { getMe } from "../api";

export const ProtectedRouteMiddleware = async (
  getServerSidePropsContext: GetServerSidePropsContext
) => {
  try {
    const { req } = getServerSidePropsContext;
    const response = await getMe(req.headers.cookie);
    return {};
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
