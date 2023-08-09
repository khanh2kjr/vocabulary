import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import PropTypes from 'prop-types'

const FormControlLabel = ({ label, message, required, children }) => {
  const classes = useStyles()
  return (
    <Box className={classes.RootFormControlLabel}>
      {!!label && (
        <Box className={classes.label}>
          <Box>{label}</Box>
          {!!required && (
            <Box component="span" sx={{ color: 'red' }}>
              *
            </Box>
          )}
        </Box>
      )}
      <Box></Box>
      {children}
      {!!message && <Box className="error regular-md-txt">{message}</Box>}
    </Box>
  )
}

FormControlLabel.propTypes = {
  label: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  required: PropTypes.bool,
  children: PropTypes.element,
}

const useStyles = makeStyles(theme => ({
  RootFormControlLabel: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  label: {},
  error: {},
}))

export default FormControlLabel
