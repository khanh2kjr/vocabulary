import LocalStorage from '@/apps/localStorage'
import GlobalLoading from '@/components/screens/GlobalLoading'
import { PathConstant } from '@/constants'
import { getSelfInfo } from '@/reducers/auth.reducer'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from './components/Header'
import LeftNavigation from './components/LeftNavigation'
import PageRoutes from './components/PageRoutes'

const Mainlayout = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const accessToken = LocalStorage.getToken()

  if (!accessToken) {
    return (
      <GlobalLoading
        callback={() => {
          setTimeout(() => {
            navigate(PathConstant.LOGIN)
          }, 500)
        }}
      />
    )
  }

  useLayoutEffect(() => {
    dispatch(getSelfInfo())
  }, [])

  return (
    <Box className={classes.RootMainLayout}>
      <LeftNavigation />
      <Box className={classes.container}>
        <Header />
        <PageRoutes />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  RootMainLayout: {
    background: '#f5f5f5',
    height: '100vh',
    display: 'flex',
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}))

export default Mainlayout
