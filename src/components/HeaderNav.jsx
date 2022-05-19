import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const HeaderNav = () => {
  const user = useSelector(state => state.user)

  return (
    <nav className='flex text-2xl justify-between w-full text-white'>
      <NavLink to='/' className='text-3xl py-1 px-2 font-bold hover:bg-blue-600'>Ticket-System</NavLink>
      <div className='flex gap-4'>
        {
          user.logged
            ? (
              <>
                <NavLink to='/profile' className='py-1 px-2 hover:bg-blue-600'>{user.username}</NavLink>
                <NavLink to='/tickets' className='py-1 px-2 hover:bg-blue-600'>Tickets</NavLink>
              </>
              )
            : <NavLink to='/login' className='py-1 px-2 hover:bg-blue-600'>Login</NavLink>
        }

        <NavLink to='/search' className='py-1 px-2 hover:bg-blue-600'>Buscar</NavLink>
      </div>
    </nav>
  )
}

export default HeaderNav
