import React, { useState } from "react";

const AddComment = ({addComment}) => {
    const [newComment, setNewComment] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        addComment(newComment);
        setNewComment("");
    }

    return (
        <form className="AddComment" onSubmit={handleSubmit}>
            <label htmlFor="newComment">Add your comment here</label>
            <textarea
            id="newComment"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}></textarea>
            <button type="submit">Add</button>
        </form>
    )
}
export default AddComment