function CommentItem(props) {
    

    return (
        <div>
            <p className="">{props.username}</p>
            <p className="font-playfair font-thin text-lg">{props.message}</p>
        </div>
    )
}

export default CommentItem
