import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Button } from "react-bootstrap";
import { Pencil, Trash } from "react-ionicons";
import {
  updateList,
  deleteList,
  getLists,
  getListById,
} from "../../redux/reducers/listsReducer";
import { createTask } from "../../redux/reducers/tasksReducer";

const ListCard = ({ listId, listTitle, projectId }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.deleteList.error);
  const list = useSelector((state) => state.getListById.list);
  const tasks = list ? list.tasks : [];

  const [isEditingList, setIsEditingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState(listTitle);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onEditList = (e) => {
    e.preventDefault();
    dispatch(updateList([listId, newListTitle]));
    setIsEditingList(false);
  };

  const toggleEditList = () => {
    setIsEditingList(true);
  };

  const handleDeleteList = async () => {
    await dispatch(deleteList(listId));
    dispatch(getLists(projectId));
  };

  const onChangeListInput = (e) => {
    setNewListTitle(e.target.value);
  };

  const toggleCreateTask = () => {
    setIsCreatingTask(!isCreatingTask);
  };

  const onChangeTaskInput = (e) => {
    setNewTaskTitle(e.target.value);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    await dispatch(createTask([listId, newTaskTitle]));
    dispatch(getLists(projectId));
    setNewTaskTitle("");
    toggleCreateTask()
  };

  useEffect(() => {
    dispatch(getListById(listId));
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
                  onBlur={toggleEditList}
                  value={newListTitle}
                />
              </Form>
            ) : (
              <Card.Header>{newListTitle}</Card.Header>
            )}
            <div className="d-flex gap-1">
              <Pencil onClick={toggleEditList} />
              <Trash onClick={handleDeleteList} />
            </div>
          </div>

          <div className="d-flex justify-content-center">
            {isCreatingTask ? (
              <>
                <Form onSubmit={handleCreateTask}>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={onChangeTaskInput}
                    // onBlur={onEditList}
                  />
                </Form>
                <div className="mt-2">
                  <Button variant="success" onClick={handleCreateTask}>
                    Create
                  </Button>
                </div>
              </>
            ) : (
              <Button variant="success" onClick={toggleCreateTask}>
                + Add task
              </Button>
            )}
          </div>
          {tasks ? tasks.map((task) => <div>{task.title}</div>) : null}
        </Card.Body>
      </Card>
    </>
  );
};

export default ListCard;
