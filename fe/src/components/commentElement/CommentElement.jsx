import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Image, Form } from "react-bootstrap";

import {
  deleteComment,
  getComments,
  updateComment,
} from "../../redux/reducers/commentsReducer";
import { getTaskById } from "../../redux/reducers/tasksReducer";

const CommentElement = ({ comment, taskObject, loggedUser }) => {
  const doDispatch = useDispatch();
  const [dispatch, setDispatch] = useState();
  const ref = useRef();

  const [isAuthor, setIsAuthor] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [commentText, setCommentText] = useState(comment.text);

  const getFullName = (firstName, lastName) => {
    return firstName + " " + lastName;
  };

  const checkCommentAuthorship = () => {
    loggedUser._id === comment.author._id
      ? setIsAuthor(true)
      : setIsAuthor(false);
  };

  const handleDeleteComment = async (commentId) => {
    setDispatch(await doDispatch(deleteComment([taskObject._id, commentId])));
  };

  const toggleEditComment = async () => {
    setIsEditingComment(!isEditingComment);
  };

  const onChangeEditComment = (e) => {
    setCommentText(e.target.value);
  };

  const handleEditComment = async (e) => {
    e.preventDefault();
    setDispatch(await doDispatch(updateComment([comment._id, commentText])));
    toggleEditComment();
  };

  useEffect(() => {
    if (isEditingComment && ref.current) {
      ref.current.focus();
    }
  }, [isEditingComment]);

  useEffect(() => {
    doDispatch(getComments(taskObject._id));
  }, [dispatch]);

  useEffect(() => {
    checkCommentAuthorship();
    doDispatch(getTaskById(taskObject._id));
  }, [doDispatch]);

  return (
    <div className="d-flex gap-2 mt-3" key={comment._id}>
      <Image
        src={comment.author.profileImg}
        roundedCircle
        style={{ maxHeight: "35px" }}
      />
      <div className="w-100">
        <div>
          {getFullName(comment.author.firstName, comment.author.lastName)}
        </div>
        <Form onSubmit={handleEditComment}>
          <Form.Control
            type="text"
            disabled={!isEditingComment}
            ref={ref}
            onChange={onChangeEditComment}
            value={commentText}
          />
        </Form>

        {isAuthor ? (
          isEditingComment ? (
            <div className="d-flex gap-2">
              <a href="#" onClick={handleEditComment}>
                Save
              </a>
              <a href="#" onClick={toggleEditComment}>
                Discard changes
              </a>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <a href="#" onClick={toggleEditComment}>
                Edit
              </a>
              <a href="#" onClick={() => handleDeleteComment(comment._id)}>
                Delete
              </a>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default CommentElement;
