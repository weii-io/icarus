import axios from "axios";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { CreateProjectDto } from "./dto";

export const createProject = async (
  cookie: string | undefined,
  dto: CreateProjectDto
) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/projects`, dto, {
    withCredentials: true,
    headers: { cookie: cookie },
  });
};
