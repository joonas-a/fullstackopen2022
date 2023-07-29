const mongoose = require("mongoose")
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post("/", (request, response) => {
  if (request.body.title == null || request.body.url == null) {
    response.status(400).json(request.body)
  } else {
    const blog = new Blog(request.body)

    blog.save().then((result) => {
      response.status(201).json(result)
    })
  }
})

blogsRouter.delete("/:id", async (request, response) => {
  const toBeDeleted = await Blog.findByIdAndRemove(request.params.id)
  if (toBeDeleted == null) {
    response.status(404).end()
  } else {
    response.status(204).end()
  }
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
