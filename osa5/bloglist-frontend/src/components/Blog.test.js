import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const likeMock = () => {
  return true
}

const deleteMock = () => {
  return true
}

const testBlog = {
  title: 'Title is rendered',
  author: 'Author',
  url: 'UrlNotRendered',
  likes: 404,
}

test('Initially show only title and author of a blog', async () => {
  render(
    <Blog
      blog={testBlog}
      handleBlogLike={likeMock}
      handleBlogRemoval={deleteMock}
    />
  )

  const titleAndAuthor = await screen.findByText('Title is rendered by Author')
  const url = screen.queryByText('UrlNotRendered')
  const likes = screen.queryByText('404')

  expect(titleAndAuthor).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})
