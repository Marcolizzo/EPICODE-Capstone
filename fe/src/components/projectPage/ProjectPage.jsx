import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Button } from "react-bootstrap";
import { Pencil, Trash } from "react-ionicons";
import { getLists, createList } from "../../redux/reducers/listsReducer";
import { getProjectById } from "../../redux/reducers/projectsReducer";
import ListCard from "../listCard/ListCard";

const ProjectPage = ({ projectId }) => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.getLists.lists);
  const project = useSelector((state) => state.getProjectById.project);
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newListTitle, setnewListTitle] = useState("");

  const toggleCreateList = () => {
    setIsCreatingList(!isCreatingList);
  };

  const onChangeInput = (e) => {
    setnewListTitle(e.target.value);
  };

  const handleCreateList = (e) => {
    e.preventDefault();
    dispatch(createList([projectId, newListTitle]))
    dispatch(getLists(projectId))
    // toggleCreateList();
  };

  useEffect(() => {
    dispatch(getProjectById(projectId));
    dispatch(getLists(projectId));
  }, [dispatch]);

  return (
    <>
      <h1>Hello, this is the project: {project.title}</h1>
      <div className="d-flex gap-2">
        <Card
          style={{ width: "18rem", background: "green" }}
          className="text-center fs-4"
          onClick={toggleCreateList}
        >
          + Add new List
        </Card>

        {isCreatingList ? (
          <Card style={{ width: "18rem" }} className="p-1">
            <Card.Body className="d-flex justify-content-between gap-1">
              <Form onSubmit={handleCreateList}>
                <Form.Control
                  type="text"
                  autoFocus
                  onChange={onChangeInput}
                  onBlur={toggleCreateList}
                  name="title"
                  placeholder="Insert title..."
                />
              </Form>
              <Button variant="success" onClick={handleCreateList}>
                Create
              </Button>
            </Card.Body>
          </Card>
        ) : null}

        {lists.map((list) => (
          <ListCard
            key={list._id}
            listId={list._id}
            listTitle={list.title}
            projectId={projectId}
          />
        ))}
      </div>
    </>
  );
};

export default ProjectPage;
