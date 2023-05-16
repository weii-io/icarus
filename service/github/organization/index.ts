import { GithubApiService } from "..";

export class GithubApiOrganizationService extends GithubApiService {
  constructor(private organizationName: string, accessToken: string) {
    super(accessToken);
  }

  async getRepositories() {
    const url = this.API_URL.concat("/orgs")
      .concat(`/${this.organizationName}`)
      .concat("/repos");
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${this.accessToken}`);
    const options: RequestInit = {
      method: "GET",
      headers: headers,
    };

    return fetch(url, options);
  }
}
