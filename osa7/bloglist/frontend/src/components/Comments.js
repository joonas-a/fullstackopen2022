import CommentForm from './CommentForm'

const Comments = ({ blog }) => {
  return (
    <div>
      <h4>Comments</h4>
      <CommentForm blog={blog} />
      {blog.comments.length !== 0 ? (
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment._id}>{comment.content}</li>
          ))}
        </ul>
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  )
}

export default Comments
