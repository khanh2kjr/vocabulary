import { AppConstant } from '@/constants'
import { screenSelector, updateAlert } from '@/reducers/screen.reducer'
import { Fragment, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonAlert from './CommonAlert'

const Alert = () => {
  const dispatch = useDispatch()
  const showAlertTimeout = useRef(null)
  const { isShowAlert, alertInfo } = useSelector(screenSelector)

  const handleCloseAlert = () => {
    if (showAlertTimeout) {
      clearTimeout(showAlertTimeout.current)
      showAlertTimeout.current = null
    }
    dispatch(updateAlert({ isShowAlert: false }))
  }

  useEffect(() => {
    if (isShowAlert) {
      if (showAlertTimeout.current) {
        clearTimeout(showAlertTimeout.current)
        showAlertTimeout.current = null
      }
      showAlertTimeout.current = setTimeout(() => {
        handleCloseAlert()
      }, AppConstant.SNACK_BAR_DURATION)
    }
  }, [isShowAlert])

  return !!isShowAlert ? (
    <CommonAlert
      {...alertInfo}
      showAlertTimeout={showAlertTimeout}
      isAutoClose
      isShow={isShowAlert}
      onClose={handleCloseAlert}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    />
  ) : (
    <Fragment />
  )
}

export default Alert
