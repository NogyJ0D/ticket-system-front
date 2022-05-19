import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const HeaderNav = () => {
  const user = useSelector(state => state.user)

  return (
    <nav className='flex justify-between w-full text-2xl text-white'>
      <NavLink to='/' className='px-2 py-1 text-3xl font-bold hover:bg-blue-600'>Ticket-System</NavLink>
      <div className='flex gap-4'>
        {
          !user.loading && user.logged
            ? (
              <>
                <NavLink to='/profile' className='px-2 py-1 hover:bg-blue-600'>{user.username}</NavLink>
                <NavLink to='/tickets' className='px-2 py-1 hover:bg-blue-600'>Tickets</NavLink>
              </>
              )
            : <NavLink to='/login' className='px-2 py-1 hover:bg-blue-600'>Login</NavLink>
        }

        <NavLink to='/search' className='px-2 py-1 hover:bg-blue-600'>Buscar</NavLink>
      </div>
    </nav>
  )
}

export default HeaderNav
