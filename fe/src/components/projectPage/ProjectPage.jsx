import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Button } from "react-bootstrap";
import { CloseCircleOutline } from "react-ionicons";
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
  const onCreateList = (e) => {
    e.preventDefault();
    handleCreateList();
  };

  const handleCreateList = async () => {
    await dispatch(createList([projectId, newListTitle]));
    setnewListTitle("");
    toggleCreateList();
  };

  useEffect(() => {
    dispatch(getLists(projectId));
    dispatch(getProjectById(projectId));
  }, [dispatch, isCreatingList]);

  return (
    <>
      <h1>Hello, this is the project: {project.title}</h1>
      <div className="d-flex gap-2">
        {isCreatingList ? (
          <Card className="p-1" style={{maxHeight: "8rem"}}>
            <Card.Body className="d-flex justify-content-between gap-1">
              <Form onSubmit={onCreateList}>
                <Form.Control
                  type="text"
                  autoFocus
                  onChange={onChangeInput}
                  // onBlur={toggleCreateList}
                  placeholder="Insert title..."
                  value={newListTitle}
                />
              </Form>
            </Card.Body>
            <div className="d-flex gap-2 justify-content-center">
              <Button variant="success" onClick={handleCreateList}>
                Create
              </Button>
              <Button variant="danger" onClick={toggleCreateList}>
                <CloseCircleOutline />
              </Button>
            </div>
          </Card>
        ) : (
          <Button
          style={{maxHeight: "3rem"}}
            variant="success"
            onClick={toggleCreateList}
          >
            + Add new List
          </Button>
        )}

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
