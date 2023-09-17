const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Testi Yksi',
    author: 'Testaaja Ensimmäinen',
    url: 'localhost',
    likes: 11,
  },
  {
    title: 'Testi Kaksi',
    author: 'Testaaja Kaksi',
    url: 'remotehost',
    likes: 23,
  },
  {
    title: 'Testi Kolme',
    author: 'Testaaja Kolmas',
    url: 'web',
    likes: 71,
  },
]

const newBlog = {
  title: 'Testi 4',
  author: 'Testaaja 4',
  url: '127.0.0.1',
  likes: 4,
}

const noLikesBlog = {
  title: 'No Likes',
  author: 'Tester',
  url: '168.192.0.1',
}

const noTitleBlog = {
  author: 'Test412',
  url: 'www.com',
  likes: 10,
}

const noUrlBlog = {
  title: 'NoUrl',
  author: 'Test412',
  likes: 10,
}

const nonExisting = {
  title: 'toBeRemoved',
  author: 'toBeRemoved',
  url: 'toBeRemoved',
  likes: '5',
}

const nonExistingId = async () => {
  const blog = new Blog(nonExisting)
  await blog.save()
  await blog.deleteOne()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  newBlog,
  noLikesBlog,
  noTitleBlog,
  noUrlBlog,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
