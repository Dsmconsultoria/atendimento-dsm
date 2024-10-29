export interface Task {
  id: string;
  name: string;
  assignee: string;
  dueDate: string;
  startTime: string;
  endTime: string;
  signature: string;
  status: 'Pendente' | 'Concluída';
  createdAt: string;
}