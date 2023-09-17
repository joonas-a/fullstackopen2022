import { useState, useImperativeHandle, forwardRef } from 'react'
import { Button, Box } from '@mui/material'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <Box>
      <div style={hideWhenVisible}>
        <Button variant="outlined" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="outlined" color="error" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </Box>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
