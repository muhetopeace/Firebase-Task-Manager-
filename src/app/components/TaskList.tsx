'use client';
import { CheckCircle2, Circle, Trash2, Edit } from 'lucide-react';
import { Task } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onToggleComplete, onEdit, onDelete }: TaskListProps) {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No tasks yet</h3>
        <p className="text-gray-600">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4 flex-1">
              <button
                onClick={() => onToggleComplete(task)}
                className="mt-1 flex-shrink-0"
              >
                {task.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300 hover:text-gray-400" />
                )}
              </button>
              
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`mt-2 text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                    {task.description}
                  </p>
                )}
                <div className="mt-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(task.priority)}`}>
                    {task.priority} Priority
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => onEdit(task)}
                className="p-2 hover:bg-indigo-50 rounded-lg transition duration-200 text-indigo-600"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-2 hover:bg-red-50 rounded-lg transition duration-200 text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}