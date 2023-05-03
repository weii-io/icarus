import { GithubProfile, User } from "../interface";

export const getUserGithubRepositoriesApi = async (
  githubProfile: GithubProfile
) => {
  const headers = new Headers();
  const url = `https://api.github.com/users/${githubProfile.username}/repos`;
  headers.set("Authorization", `Bearer ${githubProfile.accessToken}`);
  const options: RequestInit = {
    method: "GET",
    headers: headers,
  };

  return fetch(url, options);
};
