import { GithubProfile } from "../interface";

export const getGithubRepositoryTree = async (
  sha: string,
  githubProfile: GithubProfile,
  repoSlug: string
) => {
  const headers = new Headers();
  const url = `https://api.github.com/repos/${repoSlug}/git/trees/${sha}`;
  headers.set("Authorization", `Bearer ${githubProfile.accessToken}`);
  const options: RequestInit = {
    method: "GET",
    headers: headers,
  };

  return fetch(url, options);
};
