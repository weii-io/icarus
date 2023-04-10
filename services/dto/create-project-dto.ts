export interface CreateProjectDto {
  name: string;
  description?: string;
  githubProfileId?: number;
  githubRepoUrl?: string;
}
