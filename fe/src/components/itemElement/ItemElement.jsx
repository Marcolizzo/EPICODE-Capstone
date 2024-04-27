import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { SquareOutline, CheckboxOutline, Trash } from "react-ionicons";
import { deleteItem, updateItem } from "../../redux/reducers/itemsReducer";
import { getTaskById } from "../../redux/reducers/tasksReducer";

const ItemElement = ({ itemObject, checklistId, taskId }) => {
  const doDispatch = useDispatch();
  const [dispatch, setDispatch] = useState();
  const item = itemObject;

  const [isTaskCompleted, setIsTaskCompleted] = useState(item.completed);
  const [isEditingItemTitle, setIsEditingItemTitle] = useState(false);
  const [itemTitle, setItemTitle] = useState(item.title);

  const toggleCompleteTask = async () => {
    const isCompleted = !isTaskCompleted;
    setIsTaskCompleted(!isTaskCompleted);
    setDispatch(
      await doDispatch(updateItem([item._id, { completed: isCompleted }]))
    );
    doDispatch(getTaskById(taskId));
  };

  const toggleEditItemTitle = () => {
    setIsEditingItemTitle(!isEditingItemTitle);
  };

  const onChangeItemTitle = (e) => {
    setItemTitle(e.target.value);
  };

  const handleEditItemTitle = async (e) => {
    e.preventDefault();
    setDispatch(await doDispatch(updateItem([item._id, { title: itemTitle }])));
    doDispatch(getTaskById(taskId));
    toggleEditItemTitle();
  };

  const handleDeleteItem = async () => {
    setDispatch(await doDispatch(deleteItem([checklistId, item._id])));
    doDispatch(getTaskById(taskId));
  };

  return (
    <>
      <div className="d-flex mt-2">
        {isTaskCompleted ? (
          <CheckboxOutline onClick={toggleCompleteTask} />
        ) : (
          <SquareOutline onClick={toggleCompleteTask} />
        )}

        {isEditingItemTitle ? (
          <Form onSubmit={handleEditItemTitle}>
            <Form.Control
              type="text"
              autoFocus
              onBlur={handleEditItemTitle}
              placeholder="Add item..."
              onChange={onChangeItemTitle}
              value={itemTitle}
            />
          </Form>
        ) : (
          <div className="align-self-center ms-2" onClick={toggleEditItemTitle}>
            {item.title}
          </div>
        )}
        <Trash className={"ms-3"} onClick={handleDeleteItem} />
      </div>
    </>
  );
};

export default ItemElement;
