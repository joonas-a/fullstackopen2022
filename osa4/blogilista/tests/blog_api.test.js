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
  const response = await api.get("/api/blogs")

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test("id field named correctly", async () => {
  const response = await api.get("/api/blogs")
  response.body.forEach((e) => {
    expect(e.id).toBeDefined()
  })
})

test("adding a new blog works", async () => {
  await api
    .post("/api/blogs")
    .send(helper.newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blogs")

  const authors = response.body.map((r) => r.author)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(authors).toContain("Testaaja 4")
})

afterAll(async () => {
  await mongoose.connection.close()
})
