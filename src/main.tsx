import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { store } from './store/store.ts'
import { Provider } from "react-redux";
import ThemeProvider from './providers/theme-provider/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
        <ThemeProvider>
        <App />
        </ThemeProvider>
      </Provider>
  </StrictMode>,
)
