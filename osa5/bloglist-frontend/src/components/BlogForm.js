const BlogForm = ({
  handleNewBlog,
  blogTitle,
  handleTitleChange,
  blogAuthor,
  handleAuthorChange,
  blogUrl,
  handleUrlChange,
  blogLikes,
  handleLikeChange,
}) => {
  return (
    <div>
      <h3>Add a new blog</h3>

      <form onSubmit={handleNewBlog}>
        <div>
          Title:
          <input type="text" value={blogTitle} onChange={handleTitleChange} />
        </div>
        <div>
          Author:
          <input type="text" value={blogAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          Url:
          <input type="text" value={blogUrl} onChange={handleUrlChange} />
        </div>
        <div>
          Likes:
          <input type="text" value={blogLikes} onChange={handleLikeChange} />
        </div>
        <button type="submit">Add new blog</button>
      </form>
    </div>
  )
}

export default BlogForm
