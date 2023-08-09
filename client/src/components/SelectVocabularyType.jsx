import FormControlLabel from '@/components/inputs/FormControlLabel'
import { vocabularySelector } from '@/reducers/vocabulary.reducer'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputSelect from './inputs/InputSelect'
import { getVocabularyType } from '@/reducers/vocabulary.reducer'

const SelectVocabularyType = ({ value, message, error, name = 'type', onChange, onBlur, label = 'Type *' }) => {
  const dispatch = useDispatch()

  const { types } = useSelector(vocabularySelector)

  useEffect(() => {
    dispatch(getVocabularyType())
  }, [])

  return (
    <FormControlLabel message={message}>
      <InputSelect
        error={!!error}
        label={label}
        value={value}
        name={name}
        onChange={onChange}
        listOptions={types}
        onBlur={onBlur}
      />
    </FormControlLabel>
  )
}

SelectVocabularyType.propTypes = {
  message: PropTypes.string,
  error: PropTypes.bool,
  value: PropTypes.any,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  label: PropTypes.string,
}

export default SelectVocabularyType
