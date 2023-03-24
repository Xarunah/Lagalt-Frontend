import { useUser } from "../../context/UserContext";
import { useState } from "react";
import CommentItem from "./CommentItem";
import { useRef } from "react";

function ProjectComments(props) {
  const [comments, setComments] = useState([]);

  const commentInput = useRef(null);

  const { user } = useUser();

//   const onCommentChange = (e) => {
//     commentInput(e.current.value);
//   };

  const postComment = () => {
    console.log(commentInput);
    console.log(user.username);
    if (!commentInput.current.value == "") {

      const kommentar = {
        username: user.username,
        message: commentInput.current.value,
      };
      
      setComments([...comments, kommentar]);
      comments.push(kommentar);
      commentInput.current.value = "";
    }
  };

  return (
    <div>
      {/* <p className="text-xl font-playfair text-center">Skills</p>
            <input
              className="bg-slate-100 resize-none p-2 focus:border-rose-400 focus:border-2 rounded-lg font-playfair border-gray-300 border-2 outline-none focus:bg-gray-200"
              ref={skillInput}
              placeholder="Add skill"
              onKeyDown={handleKeyDown}
            /> */}

      <textarea
        className="bg-slate-100 resize-none focus:border-rose-400 focus:border-2 rounded-lg font-playfair border-gray-300 border-2 outline-none focus:bg-gray-200 p-1 "
        type="text"
        // maxLength={40}
        placeholder="Write a comment"
        // onChange={onCommentChange}
        ref={commentInput}
      />

      <button
        className="bg-gradient-to-r from-orange-300 to-rose-300 hover:text-rose-400 text-white font-bold py-2 px-4 rounded font-playfair shadow-md"
        onClick={postComment}
      >
        Post
      </button>

      {comments.map((item, index) => (
        <CommentItem
          key={index}
          username={item.username}
          message={item.message}
        />
      ))}
    </div>
  );
}
export default ProjectComments;
