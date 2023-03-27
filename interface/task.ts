import { Project } from "./project";
import { User } from "./user";

export interface Task {
  id: number;
  name: string;
  description?: string;
  dueDate?: Date;
  assignee?: User;
  assigneeId?: number;
  project: Project;
  project_id?: number;
  completed: boolean;
}
