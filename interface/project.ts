import { GithubProfile } from "./github-profile";
import { User } from "./user";

export interface Project {
  id: number;
  name: string;
  description?: string;
  owner: User;
  ownerId?: number;
  githubRepoSlug?: string;
  githubProfile: GithubProfile;
}
