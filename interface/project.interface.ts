import { GithubProfile } from "./github-profile.interface";
import { User } from "./user.interface";

export interface Project {
  id: number;
  name: string;
  description?: string;
  owner: User;
  ownerId?: number;
  githubRepoSlug?: string;
  githubProfile: GithubProfile;
}
