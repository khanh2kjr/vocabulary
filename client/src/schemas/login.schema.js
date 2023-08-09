import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const loginSchema = yupResolver(
  yup.object().shape({
    username: yup.string().required('Username cannot be empty.'),
    password: yup.string().required('Password cannot be empty.'),
  })
)

export const registerSchema = yupResolver(
  yup.object().shape({
    username: yup.string().required('Username cannot be empty.'),
    password: yup.string().required('Password cannot be empty.'),
    firstName: yup.string().required('First Name cannot be empty.'),
    lastName: yup.string().required('Last Name cannot be empty.'),
  })
)
