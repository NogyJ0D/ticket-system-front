import { NavLink } from 'react-router-dom'
import { BiHome, BiUser, BiSearch } from 'react-icons/bi'
import { IoTicketOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'

const FootNav = () => {
  const user = useSelector(state => state.user)

  return (
    <nav className='flex items-center justify-center gap-2 p-2 text-4xl text-white bg-blue-500 border-t-4 border-black'>
      {
        user.logged &&
          <NavLink to='/tickets' className='bg-blue-600 border-2 rounded-lg'>
            <IoTicketOutline />
          </NavLink>
      }
      <NavLink to={`/${user.logged ? 'profile' : 'login'}`} className='bg-blue-600 border-2 rounded-lg'>
        <BiUser />
      </NavLink>
      <NavLink to='/' className='bg-blue-600 border-2 rounded-lg'>
        <BiHome />
      </NavLink>
      <NavLink to='/search' className='bg-blue-600 border-2 rounded-lg'>
        <BiSearch />
      </NavLink>
    </nav>
  )
}

export default FootNav
