import { Box, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'

const InputText = ({ sx, error, name, type, label, value, startAdornment, endAdornment, onChange, onBlur }) => {
  const classes = useStyles()

  const [internalValue, setInternalValue] = useState('')

  const handleChange = e => {
    const { value } = e.target
    setInternalValue(value)
    !!onChange && onChange({ value, name })
  }

  const handleBlur = () => {
    !!onBlur && onBlur({ internalValue, name })
  }

  useEffect(() => {
    if (value && value !== internalValue) {
      setInternalValue(value)
    }
  }, [value])

  return (
    <TextField
      sx={sx}
      error={error}
      value={internalValue}
      className={classes.RootInputText}
      type={type}
      label={label}
      InputProps={{
        startAdornment: startAdornment || <Box />,
        endAdornment: endAdornment || <Box />,
      }}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

InputText.propTypes = {
  error: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  startAdornment: PropTypes.element,
  endAdornment: PropTypes.element,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  sx: PropTypes.any,
}

const useStyles = makeStyles(theme => ({
  RootInputText: {
    width: '100%',
    maxWidth: 500,
    '& input': {},
  },
}))

export default InputText
