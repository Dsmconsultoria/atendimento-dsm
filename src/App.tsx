import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, ListTodo, PlusCircle, Trash2, Users } from 'lucide-react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, { ...task, id: Date.now().toString() }]);
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'Concluída' ? 'Pendente' : 'Concluída' }
        : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const pendingTasks = tasks.filter(task => task.status === 'Pendente').length;
  const completedTasks = tasks.filter(task => task.status === 'Concluída').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ListTodo className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">Atendimentos Dsm</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-600">
                  Pendentes: {pendingTasks}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-600">
                  Concluídos: {completedTasks}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-8 md:grid-cols-[350px,1fr]">
          <TaskForm onAddTask={addTask} />
          <TaskList 
            tasks={tasks}
            onToggleStatus={toggleTaskStatus}
            onDeleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;