import CommentForm from './CommentForm'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const Comments = ({ blog }) => {
  return (
    <div>
      <h4>Comments</h4>
      <CommentForm blog={blog} />
      {blog.comments.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {blog.comments.map((comment) => (
                <TableRow key={comment._id}>
                  <TableCell>{comment.content}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  )
}

export default Comments
