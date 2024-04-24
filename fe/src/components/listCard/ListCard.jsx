import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Form } from "react-bootstrap";
import { Pencil, Trash } from "react-ionicons";
import { updateList, deleteList, getLists } from "../../redux/reducers/listsReducer";

const ListCard = ({ listId, listTitle, projectId }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(listTitle);
  const error = useSelector((state) => state.deleteList.error)

  const onEdit = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    dispatch(updateList([listId, title]));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    dispatch(deleteList(listId))
    .then(() => {
      dispatch(getLists(projectId))
    })
  };

  const onChangeInput = (e) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <Card style={{ minWidth: "18rem" }} className="p-1">
        <Card.Body className="d-flex justify-content-between gap-1">
          {isEditing ? (
            <Form>
              <Form.Control
                type="text"
                autoFocus
                onChange={onChangeInput}
                onBlur={onEdit}
                name="title"
                value={title}
              />
            </Form>
          ) : (
            <Card.Header>{title}</Card.Header>
          )}
          <div className="d-flex gap-1">
            <Pencil onClick={handleEditClick} />
            <Trash onClick={handleDeleteClick} />
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ListCard;
