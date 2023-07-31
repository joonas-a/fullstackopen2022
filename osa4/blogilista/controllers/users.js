const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
  const allUsers = await User.find({})
  response.json(allUsers)
})

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body

  if (username == null || username.length < 3) {
    return response
      .status(400)
      .json({ error: "Username missing or too short (<3 characters)" })
  } else if (password == null || password.length < 3) {
    return response
      .status(400)
      .json({ error: "Password missing or too short (<3 characters)" })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
