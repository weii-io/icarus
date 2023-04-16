import { CreateProjectDto } from "./dto";

/**
 * To manually pass cookies to API requests in Next.js server-side rendering,
 * it's necessary to include the cookie parameter as an option since it doesn't automatically send cookies.
 * @param dto
 * @param cookie
 * @returns
 */
export const createProjectApi = async (
  dto: CreateProjectDto,
  cookie?: string
) => {
  if (cookie)
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: JSON.stringify(dto),
    });

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });
};
