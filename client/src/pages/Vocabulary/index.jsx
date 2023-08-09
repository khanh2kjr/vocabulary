import CommonTable from '@/components/CommonTable'
import InputText from '@/components/inputs/InputText'
import {
  getVocabularies,
  setHasChanged,
  setQueries,
  vocabularySelector,
  createVocabulary,
  deleteVocabulary,
} from '@/reducers/vocabulary.reducer'
import { Add, Delete, Search } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalAddANewWord from './components/ModalAddANewWord'
import { authSelector } from '@/reducers/auth.reducer'

const newWordsForYouColumns = [
  {
    id: 'name',
    name: 'Word/Phrase',
  },
  {
    id: 'type',
    name: 'Type',
  },
  {
    id: 'spelling',
    name: 'Spelling',
  },
  {
    id: 'translation',
    name: 'Translation',
  },
  {
    id: 'example',
    name: 'Example',
  },
  {
    id: 'author',
    name: 'Author',
  },
  {
    id: 'delete',
    name: 'Action',
  },
]

let timerSearch

const Vocabulary = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { vocabularies, totalElements, queries, hasChanged } = useSelector(vocabularySelector)
  const { user } = useSelector(authSelector)

  const [queriesInternal, setQueriesInternal] = useState({
    page: queries.page || 1,
    limit: queries.limit || 10,
    keyword: queries.keyword || '',
  })
  const [useModalAddANewWord, setUseModalAddANewWord] = useState(false)

  const createVocabularyRow = (vocabulary, currentUserId) => {
    const isVocabularyOwner = vocabulary.user._id === currentUserId
    return {
      ...vocabulary,
      author: `${vocabulary.user.firstName} ${vocabulary.user.lastName}`,
      delete: isVocabularyOwner ? (
        <Delete sx={{ cursor: 'pointer' }} className="svg-icon" onClick={() => handleDeleteVocabulary(vocabulary.id)} />
      ) : (
        ''
      ),
    }
  }

  const vocabulariesRows = useMemo(() => {
    return vocabularies.map(vocabulary => createVocabularyRow(vocabulary, user.id))
  }, [vocabularies])

  const handleDeleteVocabulary = vocabularyId => {
    const confirm = window.confirm('Do you wish to delete this Vocabulary?')
    if (confirm) {
      dispatch(deleteVocabulary(vocabularyId))
        .unwrap()
        .then(() => {
          dispatch(getVocabularies(queriesInternal))
        })
    }
  }

  const handlePageChange = newPage => {
    setQueriesInternal({
      ...queriesInternal,
      page: newPage,
    })
    dispatch(
      setQueries({
        ...queries,
        page: newPage,
      })
    )
  }

  const handleLimitChange = newLimit => {
    setQueriesInternal({
      ...queriesInternal,
      limit: newLimit,
      page: 1,
    })
    dispatch(
      setQueries({
        ...queries,
        limit: newLimit,
        page: 1,
      })
    )
  }

  const handleSearchChange = ({ value }) => {
    if (timerSearch) {
      clearTimeout(timerSearch)
    }
    timerSearch = setTimeout(() => {
      setQueriesInternal({
        ...queriesInternal,
        keyword: value,
      })
      dispatch(
        setQueries({
          ...queries,
          keyword: value,
          page: 1,
        })
      )
    }, 300)
  }

  const handleAddANewWord = requestBody => {
    dispatch(createVocabulary({ ...requestBody, user: user.id }))
      .unwrap()
      .then(() => {
        setUseModalAddANewWord(false)
        dispatch(getVocabularies(queriesInternal))
      })
  }

  useEffect(() => {
    if (hasChanged) {
      dispatch(getVocabularies(queriesInternal))
    }
  }, [queriesInternal])

  useEffect(() => {
    dispatch(setHasChanged(true))
    return () => {
      dispatch(setHasChanged(false))
      clearTimeout(timerSearch)
    }
  }, [])

  return (
    <Fragment>
      <CommonTable
        HeaderActions={
          <Box className={classes.headerActions}>
            <InputText
              startAdornment={<Search />}
              label="Search"
              sx={{ width: 300 }}
              value={queriesInternal.keyword}
              onChange={handleSearchChange}
            />
            <Button
              variant="outlined"
              startIcon={<Add />}
              className={classes.buttonAddANewWord}
              onClick={() => setUseModalAddANewWord(true)}
            >
              Add a new Word
            </Button>
          </Box>
        }
        title="New words for you"
        columns={newWordsForYouColumns}
        rows={vocabulariesRows}
        page={queriesInternal.page}
        limit={queriesInternal.limit}
        total={totalElements}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
      {useModalAddANewWord && (
        <ModalAddANewWord onClose={() => setUseModalAddANewWord(false)} onSubmit={handleAddANewWord} />
      )}
    </Fragment>
  )
}

const useStyles = makeStyles(() => ({
  headerActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonAddANewWord: {
    height: '36px',
  },
}))

export default Vocabulary
