import { getGithubUser } from "./get-github-user";

export const createGithubProfile = async (
  cookie: string | undefined,
  accessToken: string
) => {
  const getGithubUserResponse = await getGithubUser(accessToken);
  const user = await getGithubUserResponse.json();

  const { login: username, organizations_url: organizationUrl } = user;
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/github-profile`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie as string,
    },
    body: JSON.stringify({ username, accessToken, organizationUrl }),
  });
};
