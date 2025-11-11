'use client';
import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Task } from '../types/task';

interface TaskFormProps {
  onSubmit: (task: { title: string; description: string; priority: Task['priority'] }) => void;
  editingTask: Task | null;
  onCancelEdit: () => void;
}

export default function TaskForm({ onSubmit, editingTask, onCancelEdit }: TaskFormProps) {
  const [title, setTitle] = useState(editingTask?.title || '');
  const [description, setDescription] = useState(editingTask?.description || '');
  const [priority, setPriority] = useState<Task['priority']>(editingTask?.priority || 'Medium');

  useState(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
    }
  });

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    onSubmit({ title, description, priority });
    setTitle('');
    setDescription('');
    setPriority('Medium');
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setPriority('Medium');
    onCancelEdit();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8 ">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Plus className="w-5 h-5 mr-2" />
        {editingTask ? 'Edit Task' : 'New Task'}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full  text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            placeholder="Task title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4  text-black py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
            rows={3}
            placeholder="Task details"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task['priority'])}
            className="w-full  text-black  px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition duration-200"
          >
            {editingTask ? 'Update' : 'Add Task'}
          </button>
          {editingTask && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}