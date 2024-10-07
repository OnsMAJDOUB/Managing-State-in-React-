import React, { useState } from "react";
import { Button } from "react-bootstrap";

const TaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTaskName = taskName.trim();
    const trimmedTaskDescription = taskDescription.trim();

    //  trimmed
    if (!trimmedTaskName || !trimmedTaskDescription) {
      return;
    }

    addTask(trimmedTaskName, trimmedTaskDescription);

    setTaskName("");
    setTaskDescription("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <textarea
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
        />
        <Button variant="success" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;
