import LocalStorage from '@/apps/localStorage'
import { authSelector } from '@/reducers/auth.reducer'
import { alertSuccess } from '@/reducers/screen.reducer'
import { AccountCircle, Logout } from '@mui/icons-material'
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PathConstant } from '@/constants'

const Header = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector(authSelector)

  const name = `${user.firstName} ${user.lastName}`

  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    navigate(PathConstant.LOGIN)
    setAnchorEl(null)
    LocalStorage.clearToken()
    dispatch(
      alertSuccess({
        message: 'Logout successful!',
      })
    )
  }

  return (
    <AppBar className={classes.RootHeader} position="static">
      <Toolbar>
        <Box className={clsx(classes.title, 'medium-xl-txt')}>Vocabulary App</Box>
        <IconButton size="large" onClick={handleMenu} color="inherit">
          <AccountCircle />
        </IconButton>
        <Menu
          keepMounted
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem className={classes.accountMenuItem}>
            <Box component="span" className="semiBold-lg-txt">
              Name:
            </Box>
            <Box>{name}</Box>
          </MenuItem>
          <MenuItem onClick={handleLogout} className={classes.accountMenuItem}>
            <Logout />
            <Box>Logout</Box>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles(theme => ({
  RootHeader: {},
  title: {
    flexGrow: 1,
  },
  accountMenuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    '&:first-child': {
      cursor: 'unset',
      '&:hover': {
        background: 'unset',
      },
      '& span:last-child': {
        display: 'none',
      },
    },
  },
}))

export default Header
