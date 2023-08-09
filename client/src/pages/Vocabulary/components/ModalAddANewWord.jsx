import Modal from '@/components/Modal'
import SelectVocabularyType from '@/components/SelectVocabularyType'
import FormControlLabel from '@/components/inputs/FormControlLabel'
import InputText from '@/components/inputs/InputText'
import InputTextArea from '@/components/inputs/InputTextArea'
import { vocabularySchema } from '@/schemas/vocabulary.schema'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useForm } from 'react-hook-form'

const ModalAddANewWord = ({ onClose, onSubmit }) => {
  const classes = useStyles()

  const form = useForm({
    defaultValues: {
      name: '',
      type: '',
      spelling: '',
      translation: '',
      example: '',
    },
    resolver: vocabularySchema,
  })

  const { errors, isSubmitted } = form.formState

  const handleChange = ({ value, name }) => {
    form.setValue(name, value)
  }

  const handleBlur = ({ name }) => {
    if (isSubmitted) {
      form.trigger(name)
    }
  }

  return (
    <Modal title="Add a new word" onClose={onClose} onSubmit={form.handleSubmit(onSubmit)}>
      <Box className={classes.modalBody}>
        <FormControlLabel message={errors.name && errors.name.message}>
          <InputText
            name="name"
            label="Word/Phrase *"
            error={!!errors.name}
            value={form.getValues('name')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormControlLabel>
        <SelectVocabularyType
          error={!!errors.type}
          value={form.getValues('type')}
          message={errors.type && errors.type.message}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <InputText label="Spelling" name="spelling" value={form.getValues('spelling')} onChange={handleChange} />
        <FormControlLabel message={errors.translation && errors.translation.message}>
          <InputText
            name="translation"
            label="Translation *"
            error={!!errors.translation}
            value={form.getValues('translation')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormControlLabel>
        <InputTextArea name="example" label="Example" value={form.getValues('example')} onChange={handleChange} />
      </Box>
    </Modal>
  )
}

const useStyles = makeStyles(theme => ({
  modalBody: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
}))

export default ModalAddANewWord
