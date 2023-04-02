import { User } from "../interface";

export const getUserGithubRepositories = async (user: User) => {
  const headers = new Headers();
  const url = `https://api.github.com/users/${user.githubProfile.username}/repos`;
  headers.set("Authorization", `Bearer ${user.githubProfile.accessToken}`);
  const options: RequestInit = {
    method: "GET",
    headers: headers,
  };

  return fetch(url, options);
};
