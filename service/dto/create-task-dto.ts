export interface CreateTaskDto {
  name: string;
  description?: string;
  projectId: number;
  dueDate?: Date;
  assigneeEmail?: string;
}
