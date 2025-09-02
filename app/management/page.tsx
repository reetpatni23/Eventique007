'use client';

import { useTaskContext } from '@/context/TaskContext';

export default function ManagementPage() {
  const { tasks, addTask, toggleTask } = useTaskContext();

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">Management Dashboard</h1>

      {/* Add task button (example) */}
      <button
        onClick={() => addTask('New Task')}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
      >
        Add Task
      </button>

      {tasks.length > 0 ? (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white shadow p-4 rounded-lg border border-gray-200 flex justify-between items-center"
            >
              <span
                className={task.completed ? 'line-through text-gray-500' : ''}
              >
                {task.title}
              </span>
              <button
                onClick={() => toggleTask(task.id)}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded"
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No tasks available yet.</p>
      )}
    </div>
  );
}
