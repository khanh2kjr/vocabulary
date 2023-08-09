import Alert from '@/components/screens/Alert'
import GlobalLoading from '@/components/screens/GlobalLoading'
import { PathConstant } from '@/constants'
import { LoginLayout, MainLayout } from '@/layouts'
import { screenSelector } from '@/reducers/screen.reducer'
import { theme } from '@/ui/mui/v5'
import '@/ui/styles'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { ThemeProvider } from '@mui/material'
import { useSelector } from 'react-redux'
import { Route, BrowserRouter as RouterProvider, Routes } from 'react-router-dom'

const App = () => {
  const { globalLoading } = useSelector(screenSelector)
  return (
    <ThemeProvider theme={theme}>
      <Alert />
      {globalLoading && <GlobalLoading />}
      <RouterProvider>
        <Routes>
          <Route path={PathConstant.LOGIN} element={<LoginLayout />} />
          <Route path={PathConstant.MAIN + '*'} element={<MainLayout />} />
          <Route path={PathConstant.PAGE_404} element={<div>404</div>} />
          <Route path={PathConstant.PAGE_403} element={<div>403</div>} />
        </Routes>
      </RouterProvider>
    </ThemeProvider>
  )
}

export default App
