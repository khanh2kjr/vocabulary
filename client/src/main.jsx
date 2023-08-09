import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from '@/apps/store'
import { Provider as StoreProvider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
)
