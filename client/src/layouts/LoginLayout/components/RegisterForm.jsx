import FormControlLabel from '@/components/inputs/FormControlLabel'
import InputText from '@/components/inputs/InputText'
import { AccountBoxOutlined, LockOutlined, Login, PersonAddAltOutlined, RateReviewOutlined } from '@mui/icons-material'
import { Avatar, Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import PropTypes from 'prop-types'

const RegisterForm = ({ form, onSubmit, onGoToTheLoginForm }) => {
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
    <form className={classes.RootRegisterForm} onSubmit={form.handleSubmit(onSubmit)}>
      <Box className={classes.registerFormHeader}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <PersonAddAltOutlined />
        </Avatar>
        <Box className="medium-xl-txt">Register</Box>
      </Box>
      <Box className={classes.registerFormBody}>
        <Box className={classes.fullName}>
          <FormControlLabel message={errors.firstName && errors.firstName.message}>
            <InputText
              error={!!errors.firstName}
              name="firstName"
              label="First Name *"
              value={form.getValues('firstName')}
              onChange={handleChange}
              onBlur={handleBlur}
              startAdornment={<RateReviewOutlined className="svg-icon" />}
            />
          </FormControlLabel>
          <FormControlLabel message={errors.lastName && errors.lastName.message}>
            <InputText
              error={!!errors.lastName}
              name="lastName"
              label="Last Name *"
              value={form.getValues('lastName')}
              onChange={handleChange}
              onBlur={handleBlur}
              startAdornment={<RateReviewOutlined className="svg-icon" />}
            />
          </FormControlLabel>
        </Box>
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
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
      <Box className={classes.registerFormFooter}>
        <Box className={clsx(classes.toSignIn, 'regular-md-txt')} onClick={onGoToTheLoginForm}>
          Already have an account? Sign in
        </Box>
      </Box>
    </form>
  )
}

RegisterForm.propTypes = {
  values: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }),
  setValues: PropTypes.func,
  onSubmit: PropTypes.func,
}

const useStyles = makeStyles(theme => ({
  RootRegisterForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    minWidth: '500px',
    background: '#FFFFFF',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  },
  fullName: {
    display: 'flex',
    gap: theme.spacing(3),
  },
  registerFormHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  registerFormBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  registerFormFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  toSignIn: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
}))

export default RegisterForm
