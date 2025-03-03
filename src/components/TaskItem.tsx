import React, { useState } from 'react';
import { Task } from '../types';
import './TaskItem.css';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, title: string, description: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onToggleComplete, 
  onDeleteTask,
  onEditTask 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleToggleComplete = () => {
    onToggleComplete(task._id, !task.completed);
  };

  const handleDelete = () => {
    onDeleteTask(task._id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      onEditTask(task._id, editTitle, editDescription);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="task-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="edit-description"
            rows={2}
          />
          <div className="edit-actions">
            <button onClick={handleSave} className="btn-save">Save</button>
            <button onClick={handleCancel} className="btn-cancel">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-content">
            <div className="task-header">
              <div className="task-checkbox">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={handleToggleComplete}
                  id={`task-${task._id}`}
                />
                <label htmlFor={`task-${task._id}`} className="task-title">
                  {task.title}
                </label>
              </div>
              <div className="task-date">{formatDate(task.createdAt)}</div>
            </div>
            {task.description && (
              <div className="task-description">{task.description}</div>
            )}
          </div>
          <div className="task-actions">
            <button onClick={handleEdit} className="btn-edit">Edit</button>
            <button onClick={handleDelete} className="btn-delete">Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
