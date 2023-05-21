import { IcarusApiService } from "..";

export class IcarusApiUserService extends IcarusApiService {
  constructor() {
    super();
  }

  async getCurrentUser(cookie?: string) {
    const url = this.API_URL.concat("/users").concat("/me");
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    if (cookie) headers.set("Cookie", cookie);
    const options: RequestInit = {
      method: "GET",
      headers: headers,
      credentials: "include",
    };
    return fetch(url, options);
  }
}
