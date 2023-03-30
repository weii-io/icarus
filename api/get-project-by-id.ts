import axios from "axios";
export const getProjectById = (cookie: string | undefined, id: number) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
    withCredentials: true,
    headers: { cookie: cookie },
  });
};
