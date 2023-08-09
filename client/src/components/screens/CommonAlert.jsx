import { AppConstant } from '@/constants'
import { Alert, AlertTitle, Snackbar, Typography, useTheme } from '@mui/material'
import { useEffect } from 'react'

const CommonAlert = ({ isShow, type, onClose, anchorOrigin, message, isAutoClose, showAlertTimeout, title }) => {
  const theme = useTheme()

  useEffect(() => {
    return () => {
      clearTimeout(showAlertTimeout.current)
    }
  }, [])

  return (
    <Snackbar
      open={isShow}
      autoHideDuration={isAutoClose ? AppConstant.SNACK_BAR_DURATION : null}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert onClose={onClose} variant="filled" severity={type} style={{ zIndex: theme.zIndex.appBar + 100 }}>
        {title && <AlertTitle color="inherit">{title}</AlertTitle>}
        <Typography
          sx={{
            maxWidth: 300,
            wordBreak: 'break-word',
          }}
          variant="body2"
          component="p"
          color="inherit"
          dangerouslySetInnerHTML={{
            __html: message,
          }}
        />
      </Alert>
    </Snackbar>
  )
}

export default CommonAlert
