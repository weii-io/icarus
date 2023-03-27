import axios from "axios";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { CreateProjectDto } from "./dto";

export const createProject = async (dto: CreateProjectDto) => {
  return axios.post("/projects", dto, {
    withCredentials: true,
  });
};
