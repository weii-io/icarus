import { IcarusApiService } from "..";
import { CreateTaskDto } from "../../dto";

export class IcarusApiTaskService extends IcarusApiService {
  constructor() {
    super();
  }

  async createTask(dto: CreateTaskDto, cookie?: string) {
    const url = this.API_URL.concat("/tasks");
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

  async getTaskByProjectId(projectId: number, cookie?: string) {
    const url = this.API_URL.concat("/tasks").concat(`?projectId=${projectId}`);
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
