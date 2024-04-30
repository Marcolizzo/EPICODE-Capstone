import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Button, Container } from "react-bootstrap";
import { CloseCircleOutline } from "react-ionicons";
import { jwtDecode } from "jwt-decode";
import InvitatationModal from "../invitationModal/InvitationModal";

import { getLists, createList } from "../../redux/reducers/listsReducer";
import { getProjectById } from "../../redux/reducers/projectsReducer";
import ListCard from "../listCard/ListCard";

const ProjectPage = ({ projectId }) => {
  const doDispatch = useDispatch();
  const [dispatch, setDispatch] = useState();
  const project = useSelector((state) => state.getProjectById.project);
  const userId = jwtDecode(useSelector((state) => state.login.token)).userId;
  const lists = project ? project.lists : [];

  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newListTitle, setnewListTitle] = useState("");
  const [isInvitationModalOpen, setInvitationModalOpen] = useState(false);

  const toggleCreateList = () => {
    setnewListTitle("");
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

  const handleOpenInvitationModal = () => {
    setInvitationModalOpen(true);
  };

  const handleCloseInvitationModal = () => {
    setInvitationModalOpen(false);
  };

  useEffect(() => {
    doDispatch(getLists(projectId));
    doDispatch(getProjectById(projectId));
  }, [dispatch, isCreatingList, projectId]);

  return (
    <div className="ms-3">
      <h1>{project.title}</h1>
      {project.createdBy ? (
        userId === project.createdBy._id ? (
          <Button onClick={handleOpenInvitationModal}>Invite new member</Button>
        ) : null
      ) : null}

      <div className="mt-3">
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
      </div>

      <div className="d-flex gap-2 mt-4">
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

      {project ? (
        <InvitatationModal
          isOpen={isInvitationModalOpen}
          onClose={handleCloseInvitationModal}
          project={project}
        />
      ) : null}
    </div>
  );
};

export default ProjectPage;
