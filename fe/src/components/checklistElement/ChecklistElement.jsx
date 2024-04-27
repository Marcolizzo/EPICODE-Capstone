import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form, Dropdown, ButtonGroup } from "react-bootstrap";
import { SquareOutline, CheckboxOutline } from "react-ionicons";

import {
  deleteChecklist,
  updateChecklist,
} from "../../redux/reducers/checklistsReducer";
import { getTaskById } from "../../redux/reducers/tasksReducer";

const ChecklistElement = ({ taskObject, checklistObject }) => {
  const doDispatch = useDispatch();
  const [dispatch, setDispatch] = useState();
  const checklist = checklistObject;

  const [isEditingChecklistTitle, setIsEditingChecklistTitle] = useState(false);
  const [newChecklistTitle, setNewChecklistTitle] = useState(checklist.title);

  const toggleEditChecklistTitle = () => {
    setIsEditingChecklistTitle(!isEditingChecklistTitle);
  };

  const onChangeChecklistInput = (e) => {
    setNewChecklistTitle(e.target.value);
  };

  const handleEditChecklistTitle = async (e) => {
    e.preventDefault();
    setDispatch(
      await doDispatch(updateChecklist([checklist._id, newChecklistTitle]))
    );
    doDispatch(getTaskById(taskObject._id));
    setIsEditingChecklistTitle(!isEditingChecklistTitle);
  };

  const handleDeleteChecklist = async () => {
    setDispatch(
      await doDispatch(deleteChecklist([taskObject._id, checklist._id]))
    );
    doDispatch(getTaskById(taskObject._id));
  };

  return (
    <>
      <div className="mt-2">
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-2">
            <CheckboxOutline className="align-self-center" />
            {isEditingChecklistTitle ? (
              <Form onSubmit={handleEditChecklistTitle}>
                <Form.Control
                  type="text"
                  autoFocus
                  onBlur={handleEditChecklistTitle}
                  placeholder="Insert title..."
                  onChange={onChangeChecklistInput}
                  value={newChecklistTitle}
                />
              </Form>
            ) : (
              <div className="align-self-center" onClick={toggleEditChecklistTitle}>{checklist.title}</div>
            )}
            <Button variant="success">+ Add Item</Button>
          </div>

          <div>
            <Button variant="danger" onClick={handleDeleteChecklist}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChecklistElement;
