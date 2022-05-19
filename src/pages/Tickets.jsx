import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearSelectedTicket, getTickets, setSelectedTicket } from '../features/ticketsSlice'
import { BsArrowsAngleExpand, BsArrowsAngleContract } from 'react-icons/bs'
import TicketDisplay from '../components/TicketDisplay'

const Tickets = () => {
  const tickets = useSelector(state => state.tickets)
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [openFilters, setOpenFilters] = useState()
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    if (!user.loading && !user.logged) return navigate('/')
  }, [user.logged])

  useEffect(() => {
    dispatch(getTickets({ filter: 'none', param: 'none', page: 1, limit: 20 }))
    dispatch(clearSelectedTicket())
  }, [])

  const onSubmit = ({ filter, param, limit }) => {
    dispatch(getTickets({ filter, param, page: 1, limit }))
  }

  return (
    <div className='flex flex-col items-center w-full gap-4 px-2'>
      {
        tickets.loading &&
          <h1 className='text-4xl font-bold'>Cargando...</h1>
      }
      {
        !tickets.loading &&
          <>
            <h1 className='text-4xl font-bold'>Tickets</h1>
            <div
              className='flex flex-col w-full gap-4 p-4 font-semibold text-white bg-blue-500 border-2 border-black'
            >
              <div className='flex items-center justify-between'>
                <p>Ver por filtros</p>
                <button onClick={() => setOpenFilters(!openFilters)}>{openFilters ? <BsArrowsAngleContract /> : <BsArrowsAngleExpand />}</button>
              </div>
              {
                openFilters &&
                  <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <div className='flex items-center gap-2'>
                      <label>Filtro:</label>
                      <select
                        id='filter'
                        className='w-full p-2 py-2 bg-blue-600 border-2 border-black outline-none focus:bg-blue-700 rounded-xl'
                        defaultValue='none'
                        {...register('filter', { required: true })}
                      >
                        <option value='none'>Ninguno</option>
                        <option value='viewed.status'>Visto</option>
                        <option value='closed.status'>Cerrado</option>
                      </select>
                    </div>
                    <div className='flex items-center gap-2'>
                      <label>Parámetro:</label>
                      <select
                        id='param'
                        className='w-full p-2 py-2 bg-blue-600 border-2 border-black outline-none focus:bg-blue-700 rounded-xl'
                        defaultValue='none'
                        {...register('param', { required: true })}
                      >
                        <option value='none'>Ninguno</option>
                        <option value='true'>Si</option>
                        <option value='false'>No</option>
                      </select>
                    </div>
                    <div className='flex items-center gap-2'>
                      <label htmlFor='limit'>Ver</label>
                      <select
                        id='limit'
                        defaultValue='20'
                        className='p-2 py-2 bg-blue-600 border-2 border-black outline-none focus:bg-blue-700 rounded-xl'
                        {...register('limit', { required: true })}
                      >
                        <option value='10'>10</option>
                        <option value='15'>15</option>
                        <option value='20'>20</option>
                        <option value='25'>25</option>
                        <option value='30'>30</option>
                      </select>
                      <label htmlFor='limitNumber'>tickets.</label>
                    </div>
                    <button className='px-2 font-bold text-white bg-blue-600 border-2 border-black rounded-full hover:bg-blue-700'>Buscar</button>
                  </form>
              }
            </div>
            <table className='w-full bg-black border-separate rounded-sm'>
              <thead className=''>
                <tr className='text-white bg-blue-500'>
                  <th className='px-8'>Título</th>
                  <th className='px-8'>Email</th>
                  <th className='px-2'>Visto</th>
                  <th className='px-2'>Cerrado</th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                {
                  tickets.docs?.map(ticket => {
                    return (
                      <tr className='' key={ticket._id}>
                        <td onClick={() => dispatch(setSelectedTicket(ticket))} to={`/tickets/${ticket._id}`} className='px-2 underline break-all cursor-pointer text-sky-600'>{ticket.title}</td>
                        <td className='px-2 break-all'>{ticket.email}</td>
                        <td><input className='w-full text-center' type='checkbox' readOnly checked={ticket.viewed.status} /></td>
                        <td><input className='w-full text-center' type='checkbox' readOnly checked={ticket.closed.status} /></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <div className='flex gap-2 text-xl font-semibold'>
              <p>Tickets totales: {tickets.totalDocs}</p>
              <p />
            </div>
          </>
      }
      {
        tickets.selectedTicket &&
          <TicketDisplay controls='true' />
      }
    </div>
  )
}

export default Tickets
