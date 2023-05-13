import { IcarusApiService } from "..";
import { CreateProjectDto } from "../../dto";

export class IcarusApiProjectService extends IcarusApiService {
  constructor() {
    super();
  }

  async createProject(dto: CreateProjectDto, cookie?: string) {
    const url = this.API_URL.concat("/projects");
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    if (cookie) headers.set("Cookie", cookie);
    const options: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(dto),
      credentials: "include",
    };
    return fetch(url, options);
  }

  async getProjectById(id: string, cookie?: string) {
    const url = this.API_URL.concat("/projects").concat(`/${id}`);
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

  async getProjects(cookie?: string) {
    const url = this.API_URL.concat("/projects");
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
