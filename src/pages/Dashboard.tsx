import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { Task } from '../types';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tasks. Please try again later.');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (title: string, description: string) => {
    try {
      const newTask = await createTask(title, description);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError('Failed to add task. Please try again.');
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const updatedTask = await updateTask(id, { completed });
      setTasks(
        tasks.map(task => (task._id === id ? { ...task, completed: updatedTask.completed } : task))
      );
    } catch (err) {
      setError('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
    }
  };

  const handleEditTask = async (id: string, title: string, description: string) => {
    try {
      const updatedTask = await updateTask(id, { title, description });
      setTasks(
        tasks.map(task => (task._id === id ? { ...task, ...updatedTask } : task))
      );
    } catch (err) {
      setError('Failed to update task. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Your Tasks</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="dashboard-content">
        <div className="tasks-container">
          <TaskForm onAddTask={handleAddTask} />
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;