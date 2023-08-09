import LocalStorage from '@/apps/localStorage'
import GlobalLoading from '@/components/screens/GlobalLoading'
import { PathConstant } from '@/constants'
import { loginUser, registerUser } from '@/reducers/auth.reducer'
import { setGlobalLoading } from '@/reducers/screen.reducer'
import { loginSchema, registerSchema } from '@/schemas/login.schema'
import loginBackground from '@/ui/images/login-background.jpg'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

const LoginLayout = () => {
  const classes = useStyles({ background: loginBackground })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = LocalStorage.getToken()

  if (accessToken) {
    return (
      <GlobalLoading
        callback={() => {
          setTimeout(() => {
            navigate(PathConstant.MAIN)
          }, 500)
        }}
      />
    )
  }

  const [useLoginForm, setUseLoginForm] = useState(true)

  const loginForm = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: loginSchema,
  })

  const registerForm = useForm({
    defaultValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    resolver: registerSchema,
  })

  const submitLogin = () => {
    const requestBody = {
      username: loginForm.getValues('username'),
      password: loginForm.getValues('password'),
    }
    const action = loginUser(requestBody)
    dispatch(action)
      .unwrap()
      .then(() => {
        navigate(PathConstant.MAIN)
      })
  }

  const submitRegister = () => {
    dispatch(setGlobalLoading(true))
    const requestBody = {
      username: registerForm.getValues('username'),
      password: registerForm.getValues('password'),
      firstName: registerForm.getValues('firstName'),
      lastName: registerForm.getValues('lastName'),
    }
    const action = registerUser(requestBody)
    dispatch(action)
      .unwrap()
      .then(() => {
        setUseLoginForm(true)
      })
  }

  useEffect(() => {
    loginForm.reset()
    registerForm.reset()
  }, [useLoginForm])

  return (
    <Box className={classes.RootLoginLayout}>
      {useLoginForm ? (
        <LoginForm form={loginForm} onSubmit={submitLogin} onGoToTheRegisterForm={() => setUseLoginForm(false)} />
      ) : (
        <RegisterForm form={registerForm} onSubmit={submitRegister} onGoToTheLoginForm={() => setUseLoginForm(true)} />
      )}
    </Box>
  )
}

const useStyles = makeStyles(theme => ({
  RootLoginLayout: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: ({ background }) => `url(${background})`,
  },
}))

export default LoginLayout
