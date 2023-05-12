import { GithubProfile } from "../interface";

export const getGithubBlob = async (repoSlug: string, file_sha: string) => {
  return fetch(
    `https://api.github.com/repos/${repoSlug}/git/blobs/${file_sha}`
  );
};
