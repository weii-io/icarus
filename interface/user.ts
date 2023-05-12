import { GithubProfile } from "./github-profile";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  githubProfile: GithubProfile;
  googleProfileId?: string;
}
