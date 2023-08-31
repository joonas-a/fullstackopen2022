import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'

const MainView = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      <BlogForm />
      <h3>Current blogs</h3>
      {blogs.map((blog) => (
        <p key={blog.id} className="blog">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </p>
      ))}
    </div>
  )
}

export default MainView
