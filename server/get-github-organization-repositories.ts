import { GithubProfile } from "../interface";

export const getGithubOrganizationRepositoriesApi = async (
  githubProfile: GithubProfile,
  organizationName: string
) => {
  const headers = new Headers();
  const url = `https://api.github.com/orgs/${organizationName}/repos`;
  headers.set("Authorization", `Bearer ${githubProfile.accessToken}`);
  const options: RequestInit = {
    method: "GET",
    headers: headers,
  };

  return fetch(url, options);
};
