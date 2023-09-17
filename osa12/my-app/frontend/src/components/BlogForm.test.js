import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const createBlog = jest.fn()
  const testBlog = {
    title: 'New Testing title',
    author: 'BlogFormAuthor',
    url: 'DoesNotExist',
    likes: '13',
  }

  test('Callback function for blog creation is called with correct parameters', async () => {
    const user = userEvent.setup()

    const { container } = render(<BlogForm handleNewBlog={createBlog} />)
    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const likesInput = container.querySelector('#likes-input')
    const submitForm = screen.getByText('Add new blog')

    await user.type(titleInput, testBlog.title)
    await user.type(authorInput, testBlog.author)
    await user.type(urlInput, testBlog.url)
    await user.type(likesInput, testBlog.likes)
    await user.click(submitForm)

    expect(createBlog.mock.calls).toHaveLength(1)
    const callParams = createBlog.mock.calls[0][0]
    expect(callParams).toEqual(testBlog)
  })
})
