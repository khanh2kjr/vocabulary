import { createSlice } from '@reduxjs/toolkit'
import { AppConstant } from '@/constants'
const DEFAULT_ALERT = {
  title: '',
  message: '',
  type: 'error',
}
const initialState = {
  isShowAlert: false,
  alertInfo: {
    ...DEFAULT_ALERT,
  },
  globalLoading: false,
}
export const screenSlice = createSlice({
  name: AppConstant.STORE_NAMESPACE.SCREEN,
  initialState,
  reducers: {
    setGlobalLoading: (state, { payload }) => {
      state.globalLoading = payload
    },
    updateAlert: (state, action) => {
      state.isShowAlert = action.payload.isShowAlert
      state.alertInfo = { ...action.payload.alertInfo }
    },
    alertSuccess(state, action) {
      state.isShowAlert = true
      state.alertInfo = {
        title: '',
        type: 'success',
        message: action.payload.message,
      }
    },
    alertError(state, action) {
      state.isShowAlert = true
      state.alertInfo = {
        title: '',
        type: 'error',
        message: action.payload.message,
      }
    },
  },
})
export const screenSelector = state => state[AppConstant.STORE_NAMESPACE.SCREEN]
export const { updateAlert, alertError, alertSuccess, setGlobalLoading } = screenSlice.actions
export default screenSlice.reducer
