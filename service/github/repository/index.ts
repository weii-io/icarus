import { GithubApiService } from "..";

export class GithubApiRepositoryService extends GithubApiService {
  constructor(private readonly repositorySlug: string, accessToken: string) {
    super(accessToken);
  }

  async getBlob(fileSHA: string) {
    return fetch(
      this.API_URL.concat("/repos")
        .concat(`/${this.repositorySlug}`)
        .concat("/git")
        .concat("/blobs")
        .concat(`/${fileSHA}`)
    );
  }

  async getBranches() {
    const headers = new Headers();
    const url = this.API_URL.concat("/repos")
      .concat(`/${this.repositorySlug}`)
      .concat("/branches");
    headers.set("Authorization", `Bearer ${this.accessToken}`);
    const options: RequestInit = {
      method: "GET",
      headers: headers,
    };

    return fetch(url, options);
  }

  async getTrees(treeSHA: string) {
    const headers = new Headers();
    const url = this.API_URL.concat("/repos")
      .concat(`/${this.repositorySlug}`)
      .concat("/git")
      .concat("/trees")
      .concat(`/${treeSHA}`);
    headers.set("Authorization", `Bearer ${this.accessToken}`);
    const options: RequestInit = {
      method: "GET",
      headers: headers,
    };

    return fetch(url, options);
  }
}
