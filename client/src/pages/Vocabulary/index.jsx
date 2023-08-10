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
import TextToSpeech from '@/components/TextToSpeech'
import SelectVocabularyType from '@/components/SelectVocabularyType'

const newWordsForYouColumns = [
  {
    id: 'name',
    name: 'Word/Phrase',
  },
  {
    id: 'translation',
    name: 'Translation',
  },
  {
    id: 'spelling',
    name: 'Spelling',
  },
  {
    id: 'type',
    name: 'Type',
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
    limit: queries.limit || 100,
    keyword: queries.keyword || '',
    typeId: queries.typeId || '',
  })
  const [useModalAddANewWord, setUseModalAddANewWord] = useState(false)
  const [registeredVocabulary, setRegisteredVocabulary] = useState(null)

  const createVocabularyRow = (vocabulary, currentUserId) => {
    const isVocabularyOwner = vocabulary.user._id === currentUserId
    return {
      ...vocabulary,
      name: <TextToSpeech text={vocabulary.name} />,
      author: `${vocabulary.user.firstName} ${vocabulary.user.lastName}`,
      delete: isVocabularyOwner ? (
        <Delete
          sx={{ cursor: 'pointer' }}
          className="svg-icon"
          onClick={e => handleDeleteVocabulary(e, vocabulary.id)}
        />
      ) : (
        ''
      ),
    }
  }

  const vocabulariesRows = useMemo(() => {
    return vocabularies.map(vocabulary => createVocabularyRow(vocabulary, user.id))
  }, [vocabularies])

  const handleDeleteVocabulary = (event, vocabularyId) => {
    event.nativeEvent.stopImmediatePropagation()
    event.stopPropagation()
    const confirm = window.confirm('Do you wish to delete this Vocabulary?')
    if (confirm) {
      dispatch(deleteVocabulary(vocabularyId))
        .unwrap()
        .then(() => {
          if (vocabularies.length === 1 && queriesInternal.page !== 1) {
            setQueriesInternal({
              ...queriesInternal,
              page: queriesInternal.page - 1,
            })
            dispatch(
              setQueries({
                ...queries,
                page: queriesInternal.page - 1,
              })
            )
          } else {
            dispatch(getVocabularies(queriesInternal))
          }
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

  const handleClickRow = rowData => {
    const isVocabularyOwner = rowData.user._id === user.id
    if (isVocabularyOwner) {
      setRegisteredVocabulary(rowData)
      setUseModalAddANewWord(true)
    }
  }

  const handleOpenModalAddANewWord = () => {
    setRegisteredVocabulary(null)
    setUseModalAddANewWord(true)
  }

  const handleVocabularyTypeChange = ({ value }) => {
    setQueriesInternal({
      ...queriesInternal,
      typeId: value,
      page: 1,
    })
    dispatch(
      setQueries({
        ...queries,
        typeId: value,
        page: 1,
      })
    )
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
            <Box className={classes.leftActions}>
              <InputText
                startAdornment={<Search />}
                label="Search"
                sx={{ width: 300 }}
                value={queriesInternal.keyword}
                onChange={handleSearchChange}
              />
              <SelectVocabularyType
                sx={{ width: 200, marginTop: -1 }}
                value={queriesInternal.typeId}
                onChange={handleVocabularyTypeChange}
              />
            </Box>

            <Button
              variant="outlined"
              startIcon={<Add />}
              className={classes.buttonAddANewWord}
              onClick={handleOpenModalAddANewWord}
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
        onClickRow={handleClickRow}
      />
      {useModalAddANewWord && (
        <ModalAddANewWord
          onClose={() => setUseModalAddANewWord(false)}
          onSubmit={handleAddANewWord}
          updateValue={registeredVocabulary}
        />
      )}
    </Fragment>
  )
}

const useStyles = makeStyles(theme => ({
  headerActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonAddANewWord: {
    height: '36px',
  },
  leftActions: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
  },
}))

export default Vocabulary
