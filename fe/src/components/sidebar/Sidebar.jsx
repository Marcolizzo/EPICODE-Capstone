import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Button, ListGroup, Image } from "react-bootstrap";
import { PowerOutline } from "react-ionicons";
import UserModal from "../userModal/UserModal";
import InvitatationModal from "../invitationModal/InvitationModal";

import { getProjects } from "../../redux/reducers/projectsReducer";
import { getUserById } from "../../redux/reducers/usersReducer";
import { updateInvitation } from "../../redux/reducers/invitationsReducer";
import { logout } from "../../redux/reducers/loginReducer";

const NavPanel = () => {
  const doDispatch = useDispatch();
  const [dispatch, setDispatch] = useState();
  const navigate = useNavigate();

  const projects = useSelector((state) => state.getProjects.projects);
  const isProjectsLoading = useSelector((state) => state.getProjects.isLoading);
  const userId = jwtDecode(useSelector((state) => state.login.token)).userId;
  const user = useSelector((state) => state.getUserById.user);
  // const invitations = useSelector((state) => state.getInvitations.invitations);
  const invitations = user ? user.invitations : [];
  const [modalInvitation, setModalInvitation] = useState();

  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isInvitationModalOpen, setInvitationModalOpen] = useState(false);

  const getFullName = (firstName, lastName) => {
    return firstName + " " + lastName;
  };

  const handleOpenUserModal = () => {
    setUserModalOpen(true);
  };
  const handleCloseUserModal = () => {
    setUserModalOpen(false);
  };

  const handleLogout = () => {
    doDispatch(logout());
    navigate("/");
  };

  const handleNavigateToProject = (projectId) => {
    navigate(`../projects/${projectId}`, { replace: true });
  };

  const handleOpenInvitationModal = async (invitation) => {
    await setModalInvitation(invitation);
    setInvitationModalOpen(true);
  };

  const handleCloseInvitationModal = () => {
    setInvitationModalOpen(false);
  };

  useEffect(() => {
    doDispatch(getUserById(userId));
    doDispatch(getProjects());
    // doDispatch(getInvitations());
  }, [dispatch]);

  return (
    <>
      <Sidebar>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div>Header</div>
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu>
              <MenuItem onClick={() => navigate("/home")}>Home</MenuItem>
            </Menu>
            <Menu>
              <MenuItem onClick={handleOpenUserModal}>
                <Image
                  src={user ? user.profileImg : ""}
                  roundedCircle
                  style={{ maxHeight: "25px" }}
                />
                {user
                  ? getFullName(user.firstName, user.lastName)
                  : "Your Profile"}
              </MenuItem>
            </Menu>
            <div>
              <div>Your projects</div>
              {projects ? (
                <ListGroup>
                  {projects.map((project) => (
                    <ListGroup.Item
                      key={project._id}
                      onClick={() => handleNavigateToProject(project._id)}
                    >
                      {project.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div>You have no projects... </div>
              )}
            </div>

            <div>
              <div className="mt-5">Invitations</div>
              {invitations ? (
                <ListGroup>
                  {invitations.map((invitation) => (
                    <ListGroup.Item
                      key={invitation._id}
                      onClick={() => handleOpenInvitationModal(invitation)}
                    >
                      New invitation from {invitation.sender.username}!
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div>You have no invitation... </div>
              )}
            </div>
          </div>
          <Button
            disabled={isProjectsLoading}
            variant="danger"
            className="d-flex gap-2 justify-content-center"
            onClick={handleLogout}
          >
            <PowerOutline />
            Logout
          </Button>
        </div>
      </Sidebar>

      {user ? (
        <UserModal
          isOpen={isUserModalOpen}
          onClose={handleCloseUserModal}
          userObject={user}
        />
      ) : null}

      {modalInvitation ? (
        <InvitatationModal
          isOpen={isInvitationModalOpen}
          onClose={handleCloseInvitationModal}
          invitation={modalInvitation}
        />
      ) : null}
    </>
  );
};

export default NavPanel;
