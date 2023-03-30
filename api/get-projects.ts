import axios from "axios";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";

export function getProjects(cookie: string | undefined) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    withCredentials: true,
    headers: { cookie: cookie },
  });
}
