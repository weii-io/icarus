export interface CreateProjectDto {
  name: string;
  description?: string;
  githubProfileId?: number;
  githubRepoSlug?: string;
}
