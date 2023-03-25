function CommentItem(props) {
    

    return (
        <div className="bg-gray-200">
            <p className="">{props.username}</p>
            <p className="font-playfair font-thin text-sm">{props.timestamp}</p>
            <p className="font-playfair font-thin text-lg">{props.message}</p>
        </div>
    )
}

export default CommentItem
