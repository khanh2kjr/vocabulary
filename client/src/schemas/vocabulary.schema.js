import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const vocabularySchema = yupResolver(
  yup.object().shape({
    name: yup
      .string()
      .required('Word/Phrase cannot be empty.')
      .matches(
        /^[0-9a-zA-Z' .]+$/,
        'Only the following characters are allowed: from 0 to 9, from a to z, from A to Z, an apostrophe, and a dot.'
      ),
    type: yup.string().required('Type cannot be empty.'),
    translation: yup.string().required('Translation cannot be empty.'),
  })
)
