import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MainLayout from './components/main-layout'
import FormBuilder from './pages/form-builder'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* <Route index element={<Dashboard />} /> */}
          <Route path="form-builder" element={<FormBuilder />} />
          {/* <Route path="users" element={<Users />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
