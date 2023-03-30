import axios from "axios";
export const createGithubProfile = async (
  cookie: string | undefined,
  accessToken: string
) => {
  const { data } = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { login: username } = data;
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/users/me/github-profile`,
    {
      username: username,
      accessToken: accessToken,
    },
    { withCredentials: true, headers: { cookie: cookie } }
  );
};
