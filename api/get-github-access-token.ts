import axios from "axios";
export const getGithubAccessToken = async (code: string) => {
  return axios.post(
    "https://github.com/login/oauth/access_token",
    {
      code: code,
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
};
