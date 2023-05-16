import { GithubApiService } from "..";

export class GithubApiUserService extends GithubApiService {
  constructor(private username: string, accessToken: string) {
    super(accessToken);
  }

  async getOrganization() {
    const url = this.API_URL.concat("/users")
      .concat(`/${this.username}`)
      .concat("/orgs");
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${this.accessToken}`);
    const options: RequestInit = {
      method: "GET",
      headers: headers,
    };

    return fetch(url, options);
  }

  async getRepository() {
    const url = this.API_URL.concat("/users")
      .concat(`/${this.username}`)
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
