import { CreateTaskDto } from "./dto";

export const createTask = async (
  cookie: string | undefined,
  dto: CreateTaskDto
) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie as string,
    },
    body: JSON.stringify(dto),
  });
};
