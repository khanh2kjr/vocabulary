import { AppConstant } from '@/constants'
import { setGlobalLoading } from '@/reducers/screen.reducer'
import VocabularyService from '@/services/vocabulary.service'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { alertSuccess, alertError } from '@/reducers/screen.reducer'

const initialState = {
  vocabularies: [],
  loading: true,
  totalElements: 0,
  queries: {
    limit: 10,
    page: 1,
    keyword: '',
  },
  hasChanged: true,
  types: [],
}

export const getVocabularies = createAsyncThunk(
  `${AppConstant.STORE_NAMESPACE.VOCABULARY}/getVocabularies`,
  async (queries, { rejectWithValue, dispatch }) => {
    dispatch(setGlobalLoading(true))
    try {
      const res = await VocabularyService.getVocabularies(queries)
      return res
    } catch (error) {
      return rejectWithValue(error)
    } finally {
      dispatch(setGlobalLoading(false))
    }
  }
)

export const createVocabulary = createAsyncThunk(
  `${AppConstant.STORE_NAMESPACE.VOCABULARY}/createVocabulary`,
  async (requestBody, { rejectWithValue, dispatch }) => {
    dispatch(setGlobalLoading(true))
    try {
      const res = await VocabularyService.createVocabulary(requestBody)
      dispatch(
        alertSuccess({
          message: 'Vocabulary was created successfully.',
        })
      )
      return res
    } catch (error) {
      dispatch(
        alertError({
          message: error.message,
        })
      )
      return rejectWithValue(error)
    } finally {
      dispatch(setGlobalLoading(false))
    }
  }
)

export const deleteVocabulary = createAsyncThunk(
  `${AppConstant.STORE_NAMESPACE.VOCABULARY}/deleteVocabulary`,
  async (vocabularyId, { rejectWithValue, dispatch }) => {
    dispatch(setGlobalLoading(true))
    try {
      const res = await VocabularyService.deleteVocabulary(vocabularyId)
      dispatch(
        alertSuccess({
          message: 'Vocabulary was deleted successfully.',
        })
      )
      return res
    } catch (error) {
      dispatch(
        alertError({
          message: error.message,
        })
      )
      return rejectWithValue(error)
    } finally {
      dispatch(setGlobalLoading(false))
    }
  }
)

export const getVocabularyType = createAsyncThunk(
  `${AppConstant.STORE_NAMESPACE.VOCABULARY}/getVocabularyType`,
  async (_, { rejectWithValue }) => {
    try {
      const res = await VocabularyService.getVocabularyType()
      return res
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const vocabularySlice = createSlice({
  name: AppConstant.STORE_NAMESPACE.VOCABULARY,
  initialState,
  reducers: {
    setQueries(state, { payload }) {
      state.queries = payload
    },
    setHasChanged(state, { payload }) {
      state.hasChanged = payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getVocabularies.fulfilled, (state, { payload }) => {
      state.vocabularies = payload.data.map(vocabulary => ({
        ...vocabulary,
        id: vocabulary._id,
        type: vocabulary.type.name,
        typeId: vocabulary.type._id,
      }))
      state.totalElements = payload.pagination.total
      state.queries = {
        ...state.queries,
        limit: payload.pagination.limit,
        page: payload.pagination.page,
      }
      state.loading = false
    })
    builder.addCase(getVocabularies.rejected, (state, { payload }) => {
      state.loading = false
    })
    builder.addCase(getVocabularyType.fulfilled, (state, { payload }) => {
      state.types = payload.data.map(type => ({ ...type, id: type._id }))
    })
  },
})

export const vocabularySelector = state => state[AppConstant.STORE_NAMESPACE.VOCABULARY]

export const { setQueries, setHasChanged } = vocabularySlice.actions

export default vocabularySlice.reducer
