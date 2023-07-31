const supertest = require("supertest")
const bcrypt = require("bcrypt")
const helper = require("./test_helper")
const User = require("../models/user")
const app = require("../app")
const api = supertest(app)

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })

    await user.save()
  })

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "root2",
      name: "admin2",
      password: "sekret2",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    const usernames = usersAtEnd.map((u) => u.username)

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    expect(usernames).toContain(newUser.username)
  })

  test("creation fails if username is too short", async () => {
    const usersAtStart = await helper.usersInDb()

    const tooShortName = {
      username: "r",
      name: "root10",
      password: "sekret",
    }

    const result = await api
      .post("/api/users")
      .send(tooShortName)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("Username missing or too short")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtStart).toHaveLength(usersAtEnd.length)
  })

  test("creation fails if password is too short", async () => {
    const usersAtStart = await helper.usersInDb()

    const tooShortPassword = {
      username: "rooter10",
      name: "root10",
      password: "sr",
    }

    const result = await api
      .post("/api/users")
      .send(tooShortPassword)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("Password missing or too short")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtStart).toHaveLength(usersAtEnd.length)
  })

  test("creation fails with proper statuscode and message if username is taken", async () => {
    const usersAtStart = await helper.usersInDb()

    const takenUsername = {
      username: "root",
      name: "root",
      password: "supersekret",
    }

    const result = await api
      .post("/api/users")
      .send(takenUsername)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("expected `username` to be unique")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})
