import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const vocabularySchema = yupResolver(
  yup.object().shape({
    name: yup.string().required('Word/Phrase cannot be empty.'),
    type: yup.string().required('Type cannot be empty.'),
    translation: yup.string().required('Translation cannot be empty.'),
  })
)
