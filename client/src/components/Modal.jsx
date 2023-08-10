import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material'
import { makeStyles } from '@mui/styles'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Modal = ({ title, children, onClose, onSubmit, useHookForm = true, isEdit }) => {
  const classes = useStyles()

  return (
    <Dialog open TransitionComponent={Transition} keepMounted>
      <DialogTitle>{title}</DialogTitle>
      <Box />
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <form onSubmit={onSubmit}>
          <Box className={classes.footerActions}>
            <Button onClick={onClose}>Close</Button>
            <Button
              type="submit"
              variant="contained"
              onClick={() => {
                !!onSubmit && !useHookForm && onSubmit()
              }}
            >
              {isEdit ? 'Edit' : 'Submit'}
            </Button>
          </Box>
        </form>
      </DialogActions>
    </Dialog>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  children: PropTypes.element.isRequired,
  useHookForm: PropTypes.bool,
  isEdit: PropTypes.bool,
}

const useStyles = makeStyles(theme => ({
  footerActions: {
    display: 'flex',
    gap: theme.spacing(2),
  },
}))

export default Modal
