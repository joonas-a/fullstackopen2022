const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const Blog = require("../models/blog")
const app = require("../app")
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("all blogs are returned", async () => {
  //const response = await helper.blogsInDb()
  const response = await helper.blogsInDb()

  expect(response).toHaveLength(helper.initialBlogs.length)
})

test("id field named correctly", async () => {
  const response = await helper.blogsInDb()
  response.forEach((e) => {
    expect(e.id).toBeDefined()
  })
})

test("adding a new blog works", async () => {
  await api
    .post("/api/blogs")
    .send(helper.newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const response = await helper.blogsInDb()

  const authors = response.map((r) => r.author)

  expect(response).toHaveLength(helper.initialBlogs.length + 1)
  expect(authors).toContain("Testaaja 4")
})

test("adding a blog with no likes gets a value 0", async () => {
  await api
    .post("/api/blogs")
    .send(helper.noLikesBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const response = await helper.blogsInDb()
  const zeroLikesBlog = response.find((blog) => blog.title === "No Likes")

  expect(zeroLikesBlog.likes).toBe(0)
})

test("trying to add a blog with no title or url throws error 400", async () => {
  await api.post("/api/blogs").send(helper.noTitleBlog).expect(400)
  await api.post("/api/blogs").send(helper.noUrlBlog).expect(400)

  const response = await helper.blogsInDb()
  expect(response.length).toBe(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
