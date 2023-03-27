import axios from "axios";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";

export function getMe(cookie: string | undefined) {
  return axios.get("/users/me", {
    withCredentials: true,
    headers: { cookie: cookie },
  });
}
