'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, LogOut } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types/task';
import { addTask, getTasks, updateTask, deleteTask } from './lib/taskService';

function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, [user]);
const loadTasks = async () => {
  if (user?.email) {
    console.log('Fetching tasks for email:', user.email); // ← ADD THIS

    try {
      const userTasks = await getTasks(user.email);
      console.log('Firestore returned:', userTasks); // ← ADD THIS
      setTasks(userTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  }
};

  const handleAddOrUpdateTask = async (taskData: { title: string; description: string; priority: Task['priority'] }) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
        setEditingTask(null);
      } else {
        await addTask({
          ...taskData,
          completed: false,
          userEmail: user!.email!
        });
      }
      await loadTasks();
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task');
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      await updateTask(task.id, { completed: !task.completed });
      await loadTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        await loadTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
                <p className="text-sm text-gray-600">Hello, {user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-400 hover:bg-gray-200 rounded-lg transition duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Form */}
          <div className="lg:col-span-1">
            <TaskForm
              onSubmit={handleAddOrUpdateTask}
              editingTask={editingTask}
              onCancelEdit={() => setEditingTask(null)}
            />
          </div>

          {/* Task List */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Your Tasks
                <span className="ml-3 text-sm font-normal text-gray-500">
                  ({tasks.length} {tasks.length === 1 ? 'task' : 'tasks'})
                </span>
              </h2>
            </div>

            <TaskList
              userTasks={tasks}
              onToggleComplete={handleToggleComplete}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
}