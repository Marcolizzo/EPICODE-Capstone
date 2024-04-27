import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, ListGroup } from "react-bootstrap";
import { Pencil, Trash, CloseCircleOutline } from "react-ionicons";
import { deleteTask, updateTask } from "../../redux/reducers/tasksReducer";
import { getProjectById } from "../../redux/reducers/projectsReducer";
import { getListById } from "../../redux/reducers/listsReducer";

const TaskItem = ({ projectId, listId, task }) => {
  const doDispatch = useDispatch();
  const [dispatch, setDispatch] = useState();

  const [isEditingTask, setIsEditingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);

  const toggleEditTask = () => {
      setIsEditingTask(!isEditingTask);
    }

  const onChangeTaskInput = (e) => {
    setNewTaskTitle(e.target.value);
  };

  const onEditTask = async (e) => {
    e.preventDefault();
    setDispatch(await doDispatch(updateTask([task._id, {title: newTaskTitle}])));
    toggleEditTask();
  };

  const handleDeleteTask = async () => {
    setDispatch(await doDispatch(deleteTask([listId, task._id])));
  };

  useEffect(() => {
    doDispatch(getProjectById(projectId));
  }, [dispatch]);

  return (
    <>
      <ListGroup.Item key={task._id} action variant="info">
        {isEditingTask ? (
          <Form onSubmit={onEditTask}>
            <Form.Control
              type="text"
              autoFocus
              onChange={onChangeTaskInput}
              //   onBlur={toggleEditTask}
              value={newTaskTitle}
            />
            <div className="d-flex gap-2 mt-2">
              <Button
                type="submit"
                variant="warning"
                // onClick={() => onEditTask(task._id)}
              >
                Save
              </Button>
              <Button variant="danger" onClick={toggleEditTask}>
                <CloseCircleOutline />
              </Button>
            </div>
          </Form>
        ) : (
          <div className="d-flex justify-content-between">
            {task.title}
            <div>
              <Pencil onClick={toggleEditTask} />
              <Trash onClick={handleDeleteTask} />
            </div>
          </div>
        )}
      </ListGroup.Item>
    </>
  );
};

export default TaskItem;
