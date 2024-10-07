import React from "react";
import { Button } from "react-bootstrap";

const TaskItem = ({ task, deleteTask, toggleComplete, handleEdit }) => {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <div className="buttons">
        <Button
          variant="outline-success"
          onClick={() => toggleComplete(task.id)}
        >
          {task.completed ? "Undone" : "Done"}
        </Button>
        <Button variant="outline-info" onClick={() => handleEdit(task)}>
          Edit
        </Button>
        <Button variant="outline-danger" onClick={() => deleteTask(task.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
