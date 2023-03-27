import axios from "axios";

export function getTasks(projectId: number, cookie: string | undefined) {
  return axios.get("/tasks", {
    withCredentials: true,
    headers: { cookie: cookie },
    params: {
      projectId: projectId,
    },
  });
}
