const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: "Testi Yksi",
    author: "Testaaja Ensimmäinen",
    url: "localhost",
    likes: "11",
  },
  {
    title: "Testi Kaksi",
    author: "Testaaja Kaksi",
    url: "remotehost",
    likes: "23",
  },
  {
    title: "Testi Kolme",
    author: "Testaaja Kolmas",
    url: "web",
    likes: "71",
  },
]

const newBlog = {
  title: "Testi 4",
  author: "Testaaja 4",
  url: "127.0.0.1",
  likes: "4",
}

let nonExisting = {
  title: "poistoon",
  author: "poistoon",
  url: "poistoon.com",
  likes: "poistoon",
}

const nonExistingId = async () => {
  const Blog = new Blog(nonExisting)
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = { initialBlogs, newBlog, nonExistingId, blogsInDb }
