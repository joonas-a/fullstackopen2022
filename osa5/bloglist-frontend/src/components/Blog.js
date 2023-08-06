import { useState } from "react"

const Blog = ({ blog, handleBlogLike }) => {
  const [expanded, setExpanded] = useState(false)

  const handleLike = (event) => {
    event.stopPropagation()
    handleBlogLike(blog)
  }

  return (
    <div onClick={() => setExpanded(!expanded)} className="blog">
      {!expanded && (
        <div>
          {blog.title} by {blog.author}
        </div>
      )}
      {expanded && (
        <div>
          {blog.title} by {blog.author}
          <br />
          Url: {blog.url}
          <br />
          Likes: {blog.likes}{" "}
          <button onClick={(event) => handleLike(event)}>Like</button>
          <br />
          Added by:{" "}
          {blog.user.name
            ? blog.user.name
            : JSON.parse(window.localStorage.getItem("currentlyLoggedUser"))
                .name}
          <br />
        </div>
      )}
    </div>
  )
}

export default Blog
