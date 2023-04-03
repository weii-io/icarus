import { CreateProjectDto } from "./dto";

export const createProject = async (
  cookie: string | undefined,
  dto: CreateProjectDto
) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie as string,
    },
    body: JSON.stringify(dto),
  });
};
