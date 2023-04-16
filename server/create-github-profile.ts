import { CreateGithubProfileDto } from "./dto";
import { getGithubUserApi } from "./get-github-user";

/**
 * To manually pass cookies to API requests in Next.js server-side rendering,
 * it's necessary to include the cookie parameter as an option since it doesn't automatically send cookies.
 * @param dto
 * @param cookie
 * @returns
 */

export const createGithubProfileApi = async (
  dto: CreateGithubProfileDto,
  cookie?: string
) => {
  const getGithubUserResponse = await getGithubUserApi(dto.accessToken);
  const user = await getGithubUserResponse.json();

  const { login: username, organizations_url: organizationUrl } = user;

  if (cookie)
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/github-profile`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        organizationUrl,
        accessToken: dto.accessToken,
      }),
    });

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/github-profile`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      organizationUrl,
      accessToken: dto.accessToken,
    }),
  });
};
