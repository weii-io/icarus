import { User } from "../interface";

export const getGithubOrganizationRepositories = async (
  organizationName: string,
  user: User
) => {
  const headers = new Headers();
  const url = `https://api.github.com/orgs/${organizationName}/repos`;
  headers.set("Authorization", `Bearer ${user.githubProfile.accessToken}`);
  const options: RequestInit = {
    method: "GET",
    headers: headers,
  };

  return fetch(url, options);
};
