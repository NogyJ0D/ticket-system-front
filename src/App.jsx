import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { validate } from './features/userSlice'
import HomeLayout from './layouts/HomeLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Tickets from './pages/Tickets'

function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(validate())
  }, [])

  return (
    <Routes>
      <Route path='/' element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/tickets' element={<Tickets />} />
        <Route path='/search' element={<Search />} />
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default App
