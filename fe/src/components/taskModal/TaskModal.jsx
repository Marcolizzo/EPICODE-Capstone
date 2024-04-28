import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Dropdown, ButtonGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import ChecklistElement from "../checklistElement/ChecklistElement";
import CommentsSection from "../commentsSection/CommentsSection";

import { getProjectById } from "../../redux/reducers/projectsReducer";
import { getTaskById, updateTask } from "../../redux/reducers/tasksReducer";
import { createChecklist } from "../../redux/reducers/checklistsReducer";

const TaskModal = ({ isOpen, onClose, taskObject, listObject, projectId }) => {
  const doDispatch = useDispatch();
  const [dispatch, setDispatch] = useState();
  const task = useSelector((state) => state.getTaskById.task);
  const project = useSelector((state) => state.getProjectById.project);

  const [isEditingDescription, setEditingDescription] = useState(false);
  const [taskDescription, setTaskDescription] = useState(
    taskObject.description
  );

  const [taskPriority, setTaskPriority] = useState(taskObject.priority);
  const variantPriority =
    taskPriority === "low"
      ? "success"
      : taskPriority === "medium"
      ? "warning"
      : taskPriority === "high"
      ? "danger"
      : "info";

  const [isCreatingChecklist, setIsCreatingChecklist] = useState(false);
  const [checklistTitle, setChecklistTitle] = useState("");

  const getFullName = (firstName, lastName) => {
    return firstName + " " + lastName;
  };

  const handleSetPriority = async (e) => {
    const newPriority = e.target.name;
    setTaskPriority(newPriority);
    setDispatch(
      await doDispatch(updateTask([taskObject._id, { priority: newPriority }]))
    );
  };

  const toggleEditDescription = () => {
    setEditingDescription(!isEditingDescription);
  };

  const handleEditDescription = async (e) => {
    setDispatch(
      await doDispatch(
        updateTask([taskObject._id, { description: taskDescription }])
      )
    );
    toggleEditDescription();
  };

  const onChangeTaskDescription = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleAssignTask = async (e) => {
    const userId = e.target.id;
    setDispatch(
      await doDispatch(updateTask([taskObject._id, { assignedTo: userId }]))
    );
  };

  const toggleCreateChecklist = () => {
    setIsCreatingChecklist(!isCreatingChecklist);
  };

  const onChangeChecklistInput = (e) => {
    setChecklistTitle(e.target.value);
  };
  const handleCreateChecklist = async (e) => {
    e.preventDefault();
    setDispatch(
      await doDispatch(createChecklist([taskObject._id, checklistTitle]))
    );
    setChecklistTitle("");
    toggleCreateChecklist();
  };

  useEffect(() => {
    doDispatch(getTaskById(taskObject._id));
    doDispatch(getProjectById(projectId));
  }, [dispatch, isOpen]);

  return (
    <>
      <Modal show={isOpen} onHide={onClose} size="lg" centered>
        <Modal.Header>
          <Modal.Title className="w-100">
            <div>{taskObject.title}</div>
            <div className="d-flex justify-content-between">
              <div className="fs-6">in list {listObject.title}</div>
              <div className="fs-6">
                created by:
                {task
                  ? task.createdBy
                    ? " " +
                      getFullName(
                        task.createdBy.firstName,
                        task.createdBy.lastName
                      )
                    : "Unknown"
                  : "Unknown"}
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-2">
              <p className="p-0">Assigned to:</p>
              <Dropdown as={ButtonGroup}>
                <Button variant="primary">
                  {task
                    ? task.assignedTo
                      ? getFullName(
                          task.assignedTo.firstName,
                          task.assignedTo.lastName
                        )
                      : "Unassigned"
                    : "Unassigned"}
                </Button>
                <Dropdown.Toggle
                  split
                  variant="primary"
                  id="dropdown-split-basic"
                />
                <Dropdown.Menu>
                  {project
                    ? project.members.map((member) => (
                        <Dropdown.Item
                          key={member._id}
                          id={member._id}
                          onClick={handleAssignTask}
                        >
                          {getFullName(member.firstName, member.lastName)}
                        </Dropdown.Item>
                      ))
                    : null}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="d-flex gap-2">
              <p className="p-0">Priority:</p>
              <Dropdown as={ButtonGroup}>
                <Button variant={variantPriority}>{taskPriority}</Button>
                <Dropdown.Toggle
                  split
                  variant={variantPriority}
                  id="dropdown-split-basic"
                />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleSetPriority} name="low">
                    Low
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleSetPriority} name="medium">
                    Medium
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleSetPriority} name="high">
                    High
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="mt-4">
            <p className="p-0">Description</p>
            <Form.Control
              as={"textarea"}
              placeholder="Insert description..."
              onFocus={() => setEditingDescription(true)}
              onChange={onChangeTaskDescription}
              value={taskDescription}
            />
            {isEditingDescription ? (
              <div className="d-flex gap-2 mt-2">
                <Button variant="success" onClick={handleEditDescription}>
                  Save
                </Button>
                <Button variant="danger" onClick={toggleEditDescription}>
                  Cancel
                </Button>
              </div>
            ) : null}
          </div>

          <div className="mt-2">
            {isCreatingChecklist ? (
              <div className="mt-2 d-flex gap-2">
                <Form onSubmit={handleCreateChecklist}>
                  <Form.Control
                    type="text"
                    autoFocus
                    placeholder="Insert title..."
                    onChange={onChangeChecklistInput}
                  />
                </Form>
                <div className="d-flex gap-2">
                  <Button variant="success" onClick={handleCreateChecklist}>
                    Save
                  </Button>
                  <Button variant="danger" onClick={toggleCreateChecklist}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant="success" onClick={toggleCreateChecklist}>
                + Add Checklist
              </Button>
            )}
          </div>

          <div>
            {task
              ? task.checklists
                ? task.checklists.map((checklist) => (
                    <ChecklistElement
                      key={checklist._id}
                      taskObject={task}
                      checklistObject={checklist}
                    ></ChecklistElement>
                  ))
                : null
              : null}
          </div>

          <CommentsSection taskObject={taskObject} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskModal;
