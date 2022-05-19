import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

const Login = () => {
  document.title = 'Tickets - Login'
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.loading && user.logged) return navigate('/')
  }, [user.logged])

  return (
    <div className='flex flex-col items-center w-full gap-8 py-4'>
      <LoginForm />
    </div>
  )
}

export default Login
