import LocalStorage from '@/apps/localStorage'
import { AppConstant, PathConstant } from '@/constants'
import { alertError, alertSuccess, setGlobalLoading } from '@/reducers/screen.reducer'
import AuthService from '@/services/auth.service'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    createdAt: 0,
  },
}

export const registerUser = createAsyncThunk(
  `${AppConstant.STORE_NAMESPACE.AUTH}/registerUser`,
  async (requestBody, { rejectWithValue, dispatch }) => {
    dispatch(setGlobalLoading(true))
    try {
      const res = await AuthService.registerUser(requestBody)
      dispatch(
        alertSuccess({
          message: 'Registration success!',
        })
      )
      return res
    } catch (error) {
      dispatch(
        alertError({
          message: error.message || 'Username already taken.',
        })
      )
      return rejectWithValue(error)
    } finally {
      dispatch(setGlobalLoading(false))
    }
  }
)

export const loginUser = createAsyncThunk(
  `${AppConstant.STORE_NAMESPACE.AUTH}/loginUser`,
  async (requestBody, { rejectWithValue, dispatch }) => {
    dispatch(setGlobalLoading(true))
    try {
      const res = await AuthService.loginUser(requestBody)
      dispatch(
        alertSuccess({
          message: 'Login successful. Welcome to Vocabulary App!',
        })
      )
      return res
    } catch (error) {
      dispatch(
        alertError({
          message: error.message || 'Incorrect username or password.',
        })
      )
      return rejectWithValue(error)
    } finally {
      dispatch(setGlobalLoading(false))
    }
  }
)

export const getSelfInfo = createAsyncThunk(
  `${AppConstant.STORE_NAMESPACE.AUTH}/getSelfInfo`,
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await AuthService.getSelfInfo()
      return res
    } catch (error) {
      if (error.status === AppConstant.HTTP_STATUS_CODE.FORBIDDEN) {
        LocalStorage.clearToken()
        window.location.href = PathConstant.LOGIN
      }
      return rejectWithValue(error)
    }
  }
)

export const authSlice = createSlice({
  name: AppConstant.STORE_NAMESPACE.AUTH,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (_, { payload }) => {
      LocalStorage.setToken(payload.accessToken)
    })
    builder.addCase(getSelfInfo.fulfilled, (state, { payload }) => {
      state.user = { ...payload.data, id: payload.data._id }
    })
  },
})

export const authSelector = state => state[AppConstant.STORE_NAMESPACE.AUTH]

export default authSlice.reducer
