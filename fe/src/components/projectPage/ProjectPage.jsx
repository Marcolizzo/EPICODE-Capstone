import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Button } from "react-bootstrap";
import { CloseCircleOutline } from "react-ionicons";
import { jwtDecode } from "jwt-decode";

import { getLists, createList } from "../../redux/reducers/listsReducer";
import { getProjectById } from "../../redux/reducers/projectsReducer";
import ListCard from "../listCard/ListCard";
import { getUserById } from "../../redux/reducers/usersReducer";

const ProjectPage = ({ projectId }) => {
  const doDispatch = useDispatch();
  const [dispatch, setDispatch] = useState();
  const project = useSelector((state) => state.getProjectById.project);
  const userId = jwtDecode(useSelector((state) => state.login.token)).userId;
  const lists = project ? project.lists : [];

  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newListTitle, setnewListTitle] = useState("");

  const toggleCreateList = () => {
    setnewListTitle("")
    setIsCreatingList(!isCreatingList);
  };

  const onChangeInput = (e) => {
    setnewListTitle(e.target.value);
  };

  const handleCreateList = async (e) => {
    e.preventDefault();
    setDispatch(await doDispatch(createList([projectId, newListTitle])));
    setnewListTitle("");
    toggleCreateList();
  };

  useEffect(() => {
    doDispatch(getLists(projectId));
    doDispatch(getProjectById(projectId));
  }, [dispatch, isCreatingList]);

  useEffect(() => {
    doDispatch(getUserById(userId))
  }, [doDispatch])

  return (
    <>
      <h1>Hello, this is the project: {project.title}</h1>
      <div className="d-flex gap-2">
        {isCreatingList ? (
          <Card className="p-1" style={{ maxHeight: "8rem" }}>
            <Card.Body className="d-flex justify-content-between gap-1">
              <Form onSubmit={handleCreateList}>
                <Form.Control
                  type="text"
                  autoFocus
                  onChange={onChangeInput}
                  // onBlur={toggleCreateList}
                  placeholder="Insert title..."
                  value={newListTitle}
                />
                <div className="d-flex gap-2 justify-content-center">
                  <Button type="submit" variant="success">
                    Create
                  </Button>
                  <Button variant="danger" onClick={toggleCreateList}>
                    <CloseCircleOutline />
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        ) : (
          <Button
            style={{ maxHeight: "3rem" }}
            variant="success"
            onClick={toggleCreateList}
          >
            + Add new List
          </Button>
        )}

        {lists
          ? lists.map((list) => (
              <ListCard
                key={list._id}
                listObject={list}
                projectId={projectId}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default ProjectPage;
