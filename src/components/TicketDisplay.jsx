// import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { markClosed, markViewed } from '../features/ticketsSlice'

const TicketDisplay = ({ controls }) => {
  const state = useSelector(state => state.tickets)
  const ticket = state.selectedTicket
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm()

  // useEffect(() => {
  //   // console.log(state)
  //   console.log(ticket)
  // }, [ticket])

  const onTicketClose = ({ summary }) => {
    dispatch(markClosed({ id: ticket._id, summary }))
  }

  return (
    <>
      {
        ticket &&
          <div className='flex flex-col w-full gap-2 p-4 bg-blue-500 border-2 border-black text-white text-lg'>
            <h2 className='text-2xl text-center font-bold'>{ticket.title}</h2>
            <p>Usuario: {ticket.username}</p>
            <p className='bg-white border-2 border-black text-black px-2 py-1 rounded-lg'>{ticket.text}</p>
            <p>Ticket número: {ticket.ticketNumber}</p>
            <p>Creado: {new Date(ticket.createdAt).toLocaleString()}</p>
            {
              ticket.viewed.status
                ? (
                  <div className='bg-blue-600 text-white border-2 border-black px-2 py-1 rounded-lg'>
                    <p>Visto el: {new Date(ticket.viewed.on).toLocaleString()}</p>
                    <p>Visto por: {ticket.viewed.by?.username}</p>
                  </div>
                  )
                : <p className='text-xl font-semibold'>Visto: NO</p>
            }
            {
              ticket.viewed.status && ticket.closed.status
                ? (
                  <div className='bg-blue-600 text-white border-2 border-black px-2 py-1 rounded-lg'>
                    <p>Cerrado el: {new Date(ticket.closed.on).toLocaleString()}</p>
                    <p>Cerrado por: {ticket.closed.by?.username}</p>
                    <p>Resumen del cierre:</p>
                    <p className='bg-white border-2 border-black text-black px-2 py-1 rounded-lg'>{ticket.closed.summary}</p>
                  </div>
                  )
                : <p className='text-xl font-semibold'>Cerrado: NO</p>
                }
            {
              controls &&
                <div>
                  {
                    !ticket.viewed.status &&
                      <button onClick={() => { dispatch(markViewed(ticket._id)) }} className='bg-blue-600 w-full hover:bg-blue-700 border-2 border-black rounded-lg px-2 py-1 font-semibold'>Marcar como visto</button>
                  }
                  {
                    (ticket.viewed.status && !ticket.closed.status) &&
                      <form onSubmit={handleSubmit(onTicketClose)} className='flex flex-col gap-1'>
                        <textarea
                          placeholder='Resumen'
                          className={`px-2 py-1 text-black border-2 ${errors.summary ? 'border-red-600' : 'border-black'} rounded-lg outline-none`}
                          {...register('summary', { required: true })}
                        />
                        <button className='bg-blue-600 hover:bg-blue-700 border-2 border-black rounded-lg px-2 py-1 font-semibold'>Marcar como cerrado</button>
                      </form>
                  }
                  {
                    state.error &&
                      <p>{state.message}</p>
                  }
                </div>
            }
          </div>
      }
      {
        state.loading &&
          <div className='flex flex-col items-center w-3/4 gap-2 p-4 bg-blue-500 border-4 border-black rounded-xl'>
            <p className='text-2xl text-white font-bold'>Cargando...</p>
          </div>
      }
    </>
  )
}

export default TicketDisplay
