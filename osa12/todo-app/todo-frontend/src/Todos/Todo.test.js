import '@testing-library/jest-dom';
import React from 'react';
import Todo from './Todo';
import { render, screen } from '@testing-library/react';

const mockDelete = jest.fn();
const mockComplete = jest.fn();

const mockTodos = [
  {
    id: 1,
    text: 'Do unit testing',
    done: false,
  },
  {
    id: 2,
    text: 'Make container',
    done: true,
  },
];

describe('<Todo /> renders properly', () => {
  let container;
  beforeEach(() => {
    container = render(
      <>
        {mockTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={mockDelete}
            completeTodo={mockComplete}
          />
        ))}
      </>
    );
  });

  test('Text is readable', async () => {
    const text = await screen.findByText('Do unit testing');
    expect(text).toBeDefined();
  });
});
