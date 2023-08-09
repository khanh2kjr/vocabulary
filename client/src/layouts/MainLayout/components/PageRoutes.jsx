import { Suspense } from 'react'
import GlobalLoading from '@/components/screens/GlobalLoading'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PathConstant } from '@/constants'
import PrivateRoute from '@/components/PrivateRoute'
import InitialRoute from '@/components/InitialRoute'
import Vocabulary from '@/pages/Vocabulary'
import Quiz from '@/pages/Quiz'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

const PageRoutes = () => {
  const classes = useStyles()

  return (
    <Suspense fallback={<GlobalLoading />}>
      <Box className={classes.RootPageRoutes}>
        <Routes>
          <Route path={PathConstant.MAIN} element={<InitialRoute />} />
          <Route
            path={PathConstant.VOCABULARIES}
            element={
              <PrivateRoute isAuth>
                <Vocabulary />
              </PrivateRoute>
            }
          />
          <Route
            path={PathConstant.QUIZ}
            element={
              <PrivateRoute isAuth>
                <Quiz />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to={PathConstant.PAGE_404} replace />} />
        </Routes>
      </Box>
    </Suspense>
  )
}

const useStyles = makeStyles(theme => ({
  RootPageRoutes: {
    padding: theme.spacing(3),
    flex: 1,
  },
}))

export default PageRoutes
