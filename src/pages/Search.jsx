import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SearchForm from '../components/SearchForm'
import TicketDisplay from '../components/TicketDisplay'
import { clearSelectedTicket } from '../features/ticketsSlice'

const Search = () => {
  document.title = 'Tickets - Search'
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearSelectedTicket())
  }, [])

  return (
    <div className='flex flex-col items-center w-full px-2 gap-8'>
      <SearchForm />
      <TicketDisplay />
    </div>
  )
}

export default Search
