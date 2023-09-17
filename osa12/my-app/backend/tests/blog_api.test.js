const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

describe('When not logged in', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await helper.blogsInDb()

    expect(response).toHaveLength(helper.initialBlogs.length)
  })

  test('id field named correctly', async () => {
    const response = await helper.blogsInDb()
    response.forEach((e) => {
      expect(e.id).toBeDefined()
    })
  })
})

describe('When logged in', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('root', saltRounds)
    const testUser = new User({ username: 'root', passwordHash })
    await testUser.save()

    const dummyBlog = new Blog({
      url: 'dummy',
      title: 'dummy',
      author: 'dummy',
      likes: 50,
      user: testUser.id,
    })

    await dummyBlog.save()
  })

  test('adding a new blog works', async () => {
    // get token through logging in
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'root', password: 'root' })
      .expect(200)

    const token = loginResponse.body.token
    const blogsAtStart = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
    const authors = response.map((r) => r.author)

    expect(response).toHaveLength(blogsAtStart.length + 1)
    expect(authors).toContain('Testaaja 4')
  })

  test('trying to add a blog without a token throws 401', async () => {
    const blogsAtStart = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('adding a blog with no likes gets a value 0', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'root', password: 'root' })
      .expect(200)

    const token = loginResponse.body.token

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.noLikesBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
    const zeroLikesBlog = response.find((blog) => blog.title === 'No Likes')

    expect(zeroLikesBlog.likes).toBe(0)
  })

  test('trying to add a blog with no title or url throws error 400', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'root', password: 'root' })
      .expect(200)

    const token = loginResponse.body.token
    const blogsAtStart = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.noTitleBlog)
      .expect(400)
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.noUrlBlog)
      .expect(400)

    const response = await helper.blogsInDb()
    expect(response.length).toBe(blogsAtStart.length)
  })

  test('can delete a blog with the correct id', async () => {
    const allBlogs = await helper.blogsInDb()
    const validId = allBlogs[0].id
    const invalidId = await helper.nonExistingId()

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'root', password: 'root' })
      .expect(200)

    const token = loginResponse.body.token

    await api
      .delete(`/api/blogs/${validId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
    await api
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })

  test('updating a blog with the correct id works', async () => {
    const allBlogs = await helper.blogsInDb()
    const firstBlog = allBlogs[0]
    const invalidId = await helper.nonExistingId()
    const updatedLikes = {
      title: firstBlog.title,
      author: firstBlog.author,
      url: firstBlog.url,
      likes: firstBlog.likes + 100,
    }
    await api.put(`/api/blogs/${firstBlog.id}`).send(updatedLikes).expect(200)
    await api.put(`/api/blogs/${invalidId.id}`).send(updatedLikes).expect(404)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
