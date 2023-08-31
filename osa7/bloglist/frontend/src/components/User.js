import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h3>Blogs added by {user.name}</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {user.blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default User
