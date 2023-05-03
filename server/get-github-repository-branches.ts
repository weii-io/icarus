import { GithubProfile } from "../interface";

export const getGithubRepositoryBranches = async (
  githubProfile: GithubProfile,
  repoSlug: string
) => {
  const headers = new Headers();
  const url = `https://api.github.com/repos/${repoSlug}/branches`;
  headers.set("Authorization", `Bearer ${githubProfile.accessToken}`);
  const options: RequestInit = {
    method: "GET",
    headers: headers,
  };

  return fetch(url, options);
};
