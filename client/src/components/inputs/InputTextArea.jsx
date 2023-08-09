import { Box, TextareaAutosize } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const InputTextArea = ({ label, name, placeholder, value, onChange, onBlur }) => {
  const [internalValue, setInternalValue] = useState('')
  const [focus, setFocus] = useState(false)

  const classes = useStyles({ focus })

  const handleChange = e => {
    const { value } = e.target
    setInternalValue(value)
    !!onChange && onChange({ value, name })
  }

  const handleBlur = () => {
    setFocus(false)
    !!onBlur && onBlur({ value, name })
  }

  const handleFocus = () => {
    setFocus(true)
  }

  useEffect(() => {
    if (value && value !== internalValue) {
      setInternalValue(value)
    }
  }, [value])

  return (
    <Box className={classes.RootInputTextArea}>
      <TextareaAutosize
        className={classes.inputTextArea}
        value={internalValue}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {!!label && <Box className={classes.label}>{label}</Box>}
    </Box>
  )
}

InputTextArea.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
}

const useStyles = makeStyles(theme => ({
  RootInputTextArea: {
    position: 'relative',
  },
  inputTextArea: {
    height: '160px !important',
    overflow: 'auto !important',
    borderColor: '#d1d1d1',
    borderRadius: '4px',
    padding: theme.spacing(1.5),
    width: '100%',
    '&:hover': {
      borderColor: '#333333',
    },
    '& *': {
      fontFamily: 'Roboto',
      fontSize: 20,
    },
    '&::-webkit-input-placeholder': {
      fontSize: 16,
    },
  },
  label: {
    padding: theme.spacing(0.5),
    position: 'absolute',
    top: -12,
    left: 10,
    background: '#FFFFFF',
    fontSize: 15,
    color: ({ focus }) => (focus ? '#1976d2' : 'rgba(0, 0, 0, 0.6)'),
    fontWeight: 300,
  },
}))

export default InputTextArea
