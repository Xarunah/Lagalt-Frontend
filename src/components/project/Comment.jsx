import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import { useRef } from "react";
import { API_URL } from "../../utils/apiUrls";
import keycloak from "../../keycloak";

function ProjectComments(props) {
  const [comments, setComments] = useState([]);

  const commentInput = useRef(null);

  const { user } = useUser();

  useEffect(() => {
    fetch(`${API_URL}/api/v1/project/comments/${props.projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keycloak.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data !== undefined) {
          console.log(data.data);
          setComments(data.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const postComment = () => {
    console.log(commentInput);
    console.log(user.username);
    if (!commentInput.current.value == "") {
      let today = new Date();
      const comment = {
        username: user.username,
        timestamp:
          today.getDate() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getFullYear() +
          " at " +
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds(),
        message: commentInput.current.value,
      };
      setComments([...comments, comment]);
      comments.push(comment);
      commentInput.current.value = "";

      fetch(`${API_URL}/api/v1/project/${props.projectId}/${user.userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keycloak.token}`,
        },
        body: JSON.stringify(comment),
      })
        .then((response) => response.json())
        .then((comment) => {
          console.log("Success:", comment);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="my-3">
      <textarea
        className="bg-slate-100 resize-none focus:border-rose-400 focus:border-2 rounded-lg font-playfair border-gray-300 border-2 outline-none focus:bg-gray-200 p-1  w-full h-20 "
        type="text"
        // maxLength={40}
        placeholder="Write a comment"
        // onChange={onCommentChange}
        ref={commentInput}
      />

      <button
        className="my-2 bg-gradient-to-r from-orange-300 to-rose-300 hover:text-rose-400 text-white font-bold py-2 px-4 rounded font-playfair"
        onClick={postComment}
      >
        Post Comment
      </button>

      {comments.map((item, index) => (
        <>
          <CommentItem
            key={index}
            username={item.username}
            message={item.message}
            timestamp={item.timestamp}
          />
          <br />
        </>
      ))}
    </div>
  );
}
export default ProjectComments;
