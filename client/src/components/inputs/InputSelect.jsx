import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const InputSelect = ({ name, label, listOptions, value, onChange, error, onBlur }) => {
  const classes = useStyles()

  const [internalValue, setInternalValue] = useState('*')

  const handleChange = e => {
    const { value } = e.target
    setInternalValue(value)
    onChange({
      value: value !== '*' ? value : '',
      name,
    })
  }

  const handleBlur = () => {
    !!onBlur && onBlur({ value, name })
  }

  useEffect(() => {
    if (value && value !== internalValue) {
      setInternalValue(value)
    }
  }, [value])

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select label={label} onChange={handleChange} error={error} value={internalValue} onBlur={handleBlur}>
        <MenuItem value="*" className={classes.choose}>
          Choose
        </MenuItem>
        {listOptions.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

InputSelect.propTypes = {
  label: PropTypes.string,
  listOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      name: PropTypes.string,
    })
  ),
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  error: PropTypes.bool,
  handleBlur: PropTypes.func,
}

const useStyles = makeStyles(theme => ({
  choose: {
    fontStyle: 'italic',
  },
}))

export default InputSelect
