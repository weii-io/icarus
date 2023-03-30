import axios from "axios";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";

export function getMe(cookie: string | undefined) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    withCredentials: true,
    headers: { cookie: cookie },
  });
}
