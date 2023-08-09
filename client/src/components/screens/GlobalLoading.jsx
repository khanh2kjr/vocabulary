import { Backdrop, Box, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const GlobalLoading = ({ callback }) => {
  const classes = useStyles()

  useEffect(() => {
    !!callback && callback()
  }, [])

  return (
    <Backdrop open className={classes.backdrop}>
      <Box className={classes.loadingBox}>
        <CircularProgress />
        <Box>Loading...</Box>
      </Box>
    </Backdrop>
  )
}

GlobalLoading.propTypes = {
  callback: PropTypes.func,
}

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  loadingBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 700,
  },
}))

export default GlobalLoading
