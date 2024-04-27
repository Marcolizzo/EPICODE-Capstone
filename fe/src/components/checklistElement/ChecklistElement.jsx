import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { CheckboxOutline } from "react-ionicons";
import ItemElement from "../itemElement/ItemElement";

import {
  deleteChecklist,
  updateChecklist,
} from "../../redux/reducers/checklistsReducer";
import { getTaskById } from "../../redux/reducers/tasksReducer";
import { createItem } from "../../redux/reducers/itemsReducer";

const ChecklistElement = ({ taskObject, checklistObject }) => {
  const doDispatch = useDispatch();
  const [dispatch, setDispatch] = useState();
  const checklist = checklistObject;

  const [isEditingChecklistTitle, setIsEditingChecklistTitle] = useState(false);
  const [newChecklistTitle, setNewChecklistTitle] = useState(checklist.title);

  const [isCreatingItem, setIsCreatingItem] = useState(false);
  const [itemTitle, setItemTitle] = useState("");

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
    toggleEditChecklistTitle();
  };

  const handleDeleteChecklist = async () => {
    setDispatch(
      await doDispatch(deleteChecklist([taskObject._id, checklist._id]))
    );
    doDispatch(getTaskById(taskObject._id));
  };

  const toggleCreateItem = () => {
    setIsCreatingItem(!isCreatingItem);
  };

  const onChangeItemTitle = (e) => {
    setItemTitle(e.target.value);
  };

  const handleCreateItem = async (e) => {
    e.preventDefault();
    setDispatch(await doDispatch(createItem([checklist._id, itemTitle])));
    doDispatch(getTaskById(taskObject._id));
    setItemTitle("");
    toggleCreateItem();
  };

  return (
    <>
      <div className="mt-2">
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-2">
            <CheckboxOutline className="align-self-center" color={'#2e9aff'} />
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
              <div
                className="align-self-center fs-5"
                onClick={toggleEditChecklistTitle}
              >
                {checklist.title}
              </div>
            )}
            <Button
              disabled={isCreatingItem}
              variant="success"
              onClick={toggleCreateItem}
            >
              + Add Item
            </Button>
          </div>

          <div>
            <Button variant="danger" onClick={handleDeleteChecklist}>
              Delete
            </Button>
          </div>
        </div>

        {isCreatingItem ? (
          <div className="mt-2">
            <Form onSubmit={handleCreateItem}>
              <Form.Control
                type="text"
                autoFocus
                placeholder="Add item..."
                onChange={onChangeItemTitle}
              />
            </Form>
            <div className="d-flex gap-2 mt-2">
              <Button variant="success" onClick={handleCreateItem}>
                Create
              </Button>
              <Button variant="danger" onClick={toggleCreateItem}>
                Cancel
              </Button>
            </div>
          </div>
        ) : null}

        {checklist
          ? checklist.items
            ? checklist.items.map((item) => (
                <ItemElement
                  key={item._id}
                  itemObject={item}
                  checklistId={checklist._id}
                  taskId={taskObject._id}
                ></ItemElement>
              ))
            : null
          : null}
      </div>
    </>
  );
};

export default ChecklistElement;
