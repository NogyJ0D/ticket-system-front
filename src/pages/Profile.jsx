import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.loading && !user.logged) return navigate('/')
  }, [user.logged])

  return (
    <div className='flex flex-col items-center text-white w-full gap-2 px-2 bg-blue-500 border-2 border-black'>
      <p>{user.username}</p>
    </div>
  )
}

export default Profile
