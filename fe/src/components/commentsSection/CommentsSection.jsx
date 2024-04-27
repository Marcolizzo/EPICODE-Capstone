import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Button, Image, Form } from "react-bootstrap";

import { getUserById } from "../../redux/reducers/usersReducer";
import { createComment } from "../../redux/reducers/commentsReducer";
import { getTaskById } from "../../redux/reducers/tasksReducer";

const CommentsSection = ({ taskObject }) => {
  const doDispatch = useDispatch();
  const [dispatch, setDispatch] = useState();
  const userId = jwtDecode(useSelector((state) => state.login.token)).userId;
  const user = useSelector((state) => state.getUserById.user);
  const comments = taskObject.comments;

  const [isCreateComment, setIsCreateComment] = useState(false);
  const [newComment, setNewComment] = useState("");

  const getFullName = (firstName, lastName) => {
    return firstName + " " + lastName;
  };

  const toggleCreateComment = () => {
    setIsCreateComment(!isCreateComment);
  };

  const onChangeCreateCommentInput = (e) => {
    setNewComment(e.target.value);
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();
    setDispatch(await doDispatch(createComment([taskObject._id, newComment])));
    setNewComment("");
    toggleCreateComment();
  };

  useEffect(() => {
    doDispatch(getTaskById(taskObject._id));
  }, [dispatch]);

  useEffect(() => {
    doDispatch(getUserById(userId));
  }, [doDispatch]);

  return (
    <>
      <div className="mt-4 fs-4">Comments</div>
      <div className="d-flex gap-2 mt-2">
        <Image
          src={user.profileImg}
          roundedCircle
          style={{ maxHeight: "35px" }}
        />
        {isCreateComment ? (
          <div className="mt-2 w-100">
            <Form onSubmit={handleCreateComment}>
              <Form.Control
                type="text"
                autoFocus
                placeholder="Write a comment..."
                onChange={onChangeCreateCommentInput}
              />
            </Form>
            <div className="d-flex gap-2 mt-2">
              <Button variant="success" onClick={handleCreateComment}>
                Save
              </Button>
              <Button variant="danger" onClick={toggleCreateComment}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button className="w-100 text-start" onClick={toggleCreateComment}>
            Write a comment...
          </Button>
        )}
      </div>

      <div className="mt-3">
        {comments
          ? comments.map((comment) => (
              <div className="d-flex gap-2 mt-3" key={comment._id}>
                <Image
                  src={comment.author.profileImg}
                  roundedCircle
                  style={{ maxHeight: "35px" }}
                />
                <div className="w-100">
                  <div>{getFullName(comment.author.firstName, comment.author.lastName)}</div>
                  <Form.Control
                    type="text"
                    disabled={true}
                    autoFocus
                    //   onChange={onChangeCreateCommentInput}
                    value={comment.text}
                  />
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default CommentsSection;