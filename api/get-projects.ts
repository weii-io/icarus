import axios from "axios";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";

export function getProjects(cookie: string | undefined) {
  return axios.get("/projects", {
    withCredentials: true,
    headers: { cookie: cookie },
  });
}
