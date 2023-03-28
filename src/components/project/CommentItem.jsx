function CommentItem(props) {
  return (
    <div className="flex flex-col bg-slate-200 rounded-xl p-1 -mb-5 shadow-md max-w-sm">
      <p className="text-sm">{props.username}</p>
      <p className="font-playfair text-sm">{props.timestamp}</p>
      <p className="font-playfair font-thin text-lg">{props.message}</p>
    </div>
  );
}

export default CommentItem;
