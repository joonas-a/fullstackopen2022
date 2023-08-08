import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const likeMock = jest.fn()
const deleteMock = jest.fn()

const user = {
  name: 'tester',
  username: 'root',
}
const testBlog = {
  title: 'Title is rendered',
  author: 'Author',
  url: 'UrlNotRendered',
  likes: 404,
  user: {
    name: 'tester',
    username: 'root',
  },
}

describe('<Blog /> element', () => {
  let container

  beforeEach(() => {
    container = render(
      <Blog
        blog={testBlog}
        handleBlogLike={likeMock}
        handleBlogRemoval={deleteMock}
        user={user}
      />
    )
  })

  test('Initially show only title and author of a blog', async () => {
    const titleAndAuthor = await screen.findByText(
      'Title is rendered by Author'
    )

    expect(titleAndAuthor).toBeDefined()
    expect(screen.queryByText(testBlog.url)).toBeNull()
    expect(screen.queryByText(testBlog.likes)).toBeNull()
  })

  test('Url and likes are shown too after clicking on a blog', async () => {
    const testUser = userEvent.setup()
    const clickThis = await screen.findByText('Title is rendered by Author')
    await testUser.click(clickThis)

    expect(screen.getByText(testBlog.title, { exact: false })).toBeDefined()
    expect(screen.getByText(testBlog.author, { exact: false })).toBeDefined()
    expect(screen.getByText(testBlog.url, { exact: false })).toBeDefined()
    expect(screen.getByText(testBlog.likes, { exact: false })).toBeDefined()
    expect(screen.getByText(testBlog.user.name, { exact: false })).toBeDefined()
  })
})
