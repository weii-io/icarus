import axios from "axios";
export const getProjectById = (id: number, cookie: string | undefined) => {
  return axios.get(`/projects/${id}`, {
    withCredentials: true,
    headers: { cookie: cookie },
  });
};
