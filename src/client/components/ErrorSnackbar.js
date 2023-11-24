import React from 'react'
import PropTypes from 'prop-types'
import { Snackbar } from '@material-ui/core/index.js'

function ErrorSnackbar ({ id, message, handleClose }) {
  return (
    <Snackbar id={id}
              autoHideDuration={5000}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              open={message.length > 0}
              message={message} />
  )
}

ErrorSnackbar.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string,
  handleClose: PropTypes.func
}

export default ErrorSnackbar
