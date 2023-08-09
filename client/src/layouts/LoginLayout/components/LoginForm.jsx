import InputText from '@/components/inputs/InputText'
import FormControlLabel from '@/components/inputs/FormControlLabel'
import { AccountBoxOutlined, LockOutlined, Login } from '@mui/icons-material'
import { Avatar, Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import PropTypes from 'prop-types'

const LoginForm = ({ form, onSubmit, onGoToTheRegisterForm }) => {
  const classes = useStyles()

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
    <form className={classes.RootLoginForm} onSubmit={form.handleSubmit(onSubmit)}>
      <Box className={classes.loginFormHeader}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Box className="medium-xl-txt">Sign In to Vocabulary App</Box>
      </Box>
      <Box className={classes.loginFormBody}>
        <FormControlLabel message={errors.username && errors.username.message}>
          <InputText
            error={!!errors.username}
            name="username"
            label="Username *"
            value={form.getValues('username')}
            onChange={handleChange}
            onBlur={handleBlur}
            startAdornment={<AccountBoxOutlined className="svg-icon" />}
          />
        </FormControlLabel>
        <FormControlLabel message={errors.password && errors.password.message}>
          <InputText
            error={!!errors.password}
            name="password"
            label="Password *"
            type="password"
            value={form.getValues('password')}
            onChange={handleChange}
            onBlur={handleBlur}
            startAdornment={<LockOutlined className="svg-icon" />}
          />
        </FormControlLabel>

        <Button type="submit" variant="contained" startIcon={<Login />}>
          Submit
        </Button>
      </Box>
      <Box className={classes.loginFormFooter}>
        <Box className={clsx(classes.toSignUp, 'regular-md-txt')} onClick={onGoToTheRegisterForm}>
          Don't have an account? Sign Up
        </Box>
      </Box>
    </form>
  )
}

LoginForm.propTypes = {
  values: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }),
  setValues: PropTypes.func,
  onSubmit: PropTypes.func,
}

const useStyles = makeStyles(theme => ({
  RootLoginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    minWidth: '350px',
    background: '#FFFFFF',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  },
  loginFormHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  loginFormBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  loginFormFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  toSignUp: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
}))

export default LoginForm
