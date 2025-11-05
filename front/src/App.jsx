import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import QuizRouter from './pages/QuizRouter'
import Home from './pages/Home'
import PublicRouter from './pages/PublicRouter'
import UsersRouter from './pages/users/UsersRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users/*" element={<UsersRouter />} />
        <Route path="/quiz/*" element={<QuizRouter />} />
        <Route path="/" element={<PublicRouter />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
