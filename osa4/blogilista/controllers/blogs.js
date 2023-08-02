const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const body = request.body

  if (body.title == null || body.url == null) {
    console.log("Title and URL need to be included")
    return response.status(400).json(body)
  }

  const userToken = request.user
  if (!userToken) {
    return response.status(401).json({ error: "Invalid token" })
  }
  const user = await User.findById(userToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user

  // if blog exists and user id matches the blog creators one, delete
  const blog = await Blog.findById(request.params.id)
  if (blog && blog.user.toString() === user.id) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }

  response.status(404).json({ error: "No blogs found with the requested id" })
})

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    response.status(404).end()
  } else {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    })

    if (updatedBlog == null) {
      response.status(404).end()
    } else {
      response.status(200).json(updatedBlog)
    }
  }
})

module.exports = blogsRouter
