import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)

  if (!users) {
    return <div>Loading users..</div>
  }

  // console.log(users)

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
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
