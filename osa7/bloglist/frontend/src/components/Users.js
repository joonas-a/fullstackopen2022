import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initalizeUsers } from '../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initalizeUsers())
  }, [])

  const users = useSelector((state) => state.users)

  if (!users) {
    return <div>Loading users..</div>
  }

  console.log(users)

  return (
    <div>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
