import React from 'react';
import { CheckCircle2, Trash2, User, Clock, Calendar, Edit3 } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleStatus, onDeleteTask }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">Nenhum atendimento adicionado. Comece adicionando um novo atendimento!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white rounded-lg shadow-md p-4 transition-all ${
            task.status === 'Concluída' ? 'opacity-75' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`text-lg font-medium ${
                task.status === 'Concluída' ? 'text-gray-500 line-through' : 'text-gray-800'
              }`}>
                {task.name}
              </h3>
              
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{task.assignee}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(task.dueDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{task.startTime} - {task.endTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Edit3 className="h-4 w-4" />
                  <span>Assinado por: {task.signature}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleStatus(task.id)}
                className={`p-2 rounded-full transition-colors ${
                  task.status === 'Concluída'
                    ? 'text-green-600 hover:bg-green-50'
                    : 'text-gray-400 hover:bg-gray-50'
                }`}
                title={task.status === 'Concluída' ? 'Marcar como pendente' : 'Marcar como concluído'}
              >
                <CheckCircle2 className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => onDeleteTask(task.id)}
                className="p-2 text-red-500 rounded-full hover:bg-red-50 transition-colors"
                title="Excluir atendimento"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;