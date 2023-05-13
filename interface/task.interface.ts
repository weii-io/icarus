import { Project } from "./project.interface";
import { User } from "./user.interface";

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
