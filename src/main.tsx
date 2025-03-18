import './index.css'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MainLayout from './components/main-layout'
import FormBuilder from './pages/form-builder'
import Users, {loader as usersLoader} from './pages/users'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Dashboard from './pages/dashboard'
import {ThemeProvider} from './components/theme-provider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
})

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="form-builder" element={<FormBuilder />} />
              <Route path="users" element={<Users />} loader={usersLoader(queryClient)} />
              {/* <Route path="*" element={<NotFound />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
