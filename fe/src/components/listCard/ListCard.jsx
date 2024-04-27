import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Button, ListGroup } from "react-bootstrap";
import { Pencil, Trash, CloseCircleOutline } from "react-ionicons";
import TaskItem from "../taskItem/TaskItem";
import { updateList, deleteList, getListById } from "../../redux/reducers/listsReducer";
import { createTask } from "../../redux/reducers/tasksReducer";
import { getProjectById } from "../../redux/reducers/projectsReducer";

const ListCard = ({ listObject, projectId }) => {
  const doDispatch = useDispatch();
  const [dispatch, setDispatch] = useState();

  const error = useSelector((state) => state.deleteList.error);
  const list = listObject;
  const tasks = list ? list.tasks : [];

  const [isEditingList, setIsEditingList] = useState(false);
  const [listTitle, setListTitle] = useState(list.title);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [TaskTitle, setTaskTitle] = useState("");

  const onEditList = async (e) => {
    e.preventDefault();
    setDispatch(await doDispatch(updateList([list._id, listTitle])));
    toggleEditList();
  };

  const toggleEditList = () => {
    setIsEditingList(!isEditingList);
  };

  const handleDeleteList = async () => {
    setDispatch(await doDispatch(deleteList([projectId, list._id])));
  };

  const onChangeListInput = (e) => {
    setListTitle(e.target.value);
  };

  // CREATE NEW TASKS

  const toggleCreateTask = () => {
    setTaskTitle("");
    setIsCreatingTask(!isCreatingTask);
  };

  const onChangeTaskInput = (e) => {
    setTaskTitle(e.target.value);
  };

  const onCreateTask = async (e) => {
    e.preventDefault();
    setDispatch(await doDispatch(createTask([list._id, TaskTitle])));
    setTaskTitle("");
    toggleCreateTask();
  };

  //

  useEffect(() => {
    doDispatch(getProjectById(projectId));
    doDispatch(getListById(list._id));
  }, [dispatch]);

  return (
    <>
      <Card style={{ minWidth: "18rem" }} className="p-1">
        <Card.Body>
          <div className="d-flex justify-content-between gap-1">
            {isEditingList ? (
              <Form onSubmit={onEditList}>
                <Form.Control
                  type="text"
                  autoFocus
                  onChange={onChangeListInput}
                  // onBlur={onEditList}
                  value={listTitle}
                />
              </Form>
            ) : (
              <Card.Header>{listTitle}</Card.Header>
            )}
            <div className="d-flex gap-1">
              <Pencil onClick={toggleEditList} />
              <Trash onClick={handleDeleteList} />
            </div>
          </div>

          <div className="d-flex justify-content-center">
            {isCreatingTask ? (
              <div className="mt-2">
                <Form onSubmit={onCreateTask}>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={onChangeTaskInput}
                    // onBlur={toggleCreateTask}
                  />
                </Form>
                <div className="mt-2 d-flex justify-content-center gap-2">
                  <Button variant="success" onClick={onCreateTask}>
                    Create
                  </Button>
                  <Button variant="danger" onClick={toggleCreateTask}>
                    <CloseCircleOutline />
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="success"
                className="mt-2"
                onClick={toggleCreateTask}
              >
                + Add task
              </Button>
            )}
          </div>
          {tasks.length > 0 ? (
            <ListGroup className="mt-2">
              {tasks.map((task) => (
                <TaskItem
                  key={task._id}
                  projectId={projectId}
                  listId={list._id}
                  task={task}
                ></TaskItem>
              ))}
            </ListGroup>
          ) : (
            <div className="mt-2 text-center">No tasks...</div>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ListCard;
