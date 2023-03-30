import axios from "axios";

export function getTasks(cookie: string | undefined, projectId: number) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
    withCredentials: true,
    headers: { cookie: cookie },
    params: {
      projectId: projectId,
    },
  });
}
