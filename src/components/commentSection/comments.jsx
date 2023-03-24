// let commentCounter = 1;

// export default function CommentBox() {

//     this.state = {
//       commentValue: "",
//       commentLine: [{ commentId: "", text: "" }],
//     };
    
//     setCommentLine = () => {
//         this.setState({
//           commentLine: [
//             ...this.state.commentLine,
//             { commentId: commentCounter++, text: this.state.commentValue }],
//             commentValue: "",
//         });
//       };
//       handleCommentValue = (event) => {
//         this.setState({ commentValue: event.target.value });
//       };
    
//       submitCommentLine = (event) => {
//         event.preventDefault();
//         this.setCommentLine();
//       };
    
//       enterCommentLine = (event) => {
//         if (event.charCode === 13 ) {
//             this.setCommentLine();
//         }
//       };

//     return (
//         <>
//           <CommentBox
//             commentValue={this.state.commentValue}
//             handleCommentValue={this.handleCommentValue}
//             enterCommentLine={this.enterCommentLine}
//             submitCommentLine={this.submitCommentLine}
//           />
//         </>
//       );
//   }


  

  
    


// function Commentbox1 (CommentBox) {

//     const {
//       commentValue,
//       handleCommentValue,
//       enterCommentLine,
//       submitCommentLine,
//     } = this.props;

//     const enableCommentBtn = () => {
//       return commentValue ? false : true;
//     };

//     const changeCommentBtnStyle = () => {
//       return commentValue ? "comment-btn-enabled" : "comment-btn-disabled";
//     };

//     return (
//       <div className="comments-box">
//         <input
//           onKeyPress={enterCommentLine}
//           value={commentValue}
//           id="comments-input"
//           onChange={handleCommentValue}
//           type="text"
//           placeholder="Add a comment..."
//         />
//         {/* {" "} */}
//         <button
//           onClick={submitCommentLine}
//           type="submit"
//           className="comments-button"
//           id={changeCommentBtnStyle()}
//           disabled={enableCommentBtn()}
//         >
//           Post
//         </button>
//       </div>
//     );
//   }


// function Commentbox2 (CommentBox) {

   
//         const {commentLine} = this.props;

//         return (
//             <ul className="comments-list">
//                 {commentLine.map((comment) => {return
//                     <li className="each-comment"
//                     key={comment.commentId}>{comment.text}</li>
//                 })}
//             </ul>
//         )
//     };


