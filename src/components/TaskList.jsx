import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import { Button, Form, Modal } from "react-bootstrap";

const TaskList = () => {
  // Example of task and local storage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    // Safely handle the case when savedTasks is null
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [
        {
          id: Math.random(),
          name: "GO GYM",
          description: "Boxbike session",
          completed: false,
        },
      ];
    }
  });

  // Sync tasks with localStorage whenever tasks are updated
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");
  const [editedTaskDescription, setEditedTaskDescription] = useState("");

  // Add a new task
  const addTask = (name, description) => {
    const newTask = {
      id: Math.random(),
      name,
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Handle editing a task
  const handleEdit = (task) => {
    if (!task.completed) {
      setCurrentTask(task);
      setEditedTaskName(task.name);
      setEditedTaskDescription(task.description);
      setShowModal(true);
    }
  };

  // Save changes to the edited task
  const handleSaveChanges = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === currentTask.id
        ? { ...task, name: editedTaskName, description: editedTaskDescription }
        : task
    );
    setTasks(updatedTasks);
    setShowModal(false);
  };

  return (
    <div>
      <TaskForm addTask={addTask} />
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="taskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                value={editedTaskName}
                onChange={(e) => setEditedTaskName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="taskDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                value={editedTaskDescription}
                onChange={(e) => setEditedTaskDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;
