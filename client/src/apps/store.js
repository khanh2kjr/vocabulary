import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { AppConstant } from '@/constants'
import authReducer from '@/reducers/auth.reducer'
import screenReducer from '@/reducers/screen.reducer'
import vocabularyReducer from '@/reducers/vocabulary.reducer'

const reducer = combineReducers({
  [AppConstant.STORE_NAMESPACE.AUTH]: authReducer,
  [AppConstant.STORE_NAMESPACE.SCREEN]: screenReducer,
  [AppConstant.STORE_NAMESPACE.VOCABULARY]: vocabularyReducer,
})

export default configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
