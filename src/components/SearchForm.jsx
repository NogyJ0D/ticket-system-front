import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { getTicketByNumber } from '../features/ticketsSlice'

const SearchForm = () => {
  const { handleSubmit, register, formState: { errors } } = useForm()
  const [response, setResponse] = useState('')
  const dispatch = useDispatch()

  const onSubmit = async ({ ticketNumber, secretKey }) => {
    const { payload: request } = await dispatch(getTicketByNumber({ ticketNumber, secretKey }))
    if (!request.ticketNumber) return setResponse(request)
    else return setResponse('')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center w-full gap-2 p-4 bg-blue-500 border-2 border-black'
    >
      <h3 className='text-xl font-bold text-white'>Busca tu ticket:</h3>
      <input
        type='number'
        min='0'
        placeholder='Número de ticket'
        className={`w-3/4 px-2 py-1 border-2 ${errors.ticketNumber ? 'border-red-600' : 'border-black'} rounded-lg outline-none`}
        {...register('ticketNumber', {
          required: true,
          min: '0',
          validate: (value) => value > 0
        })}
      />
      <input
        type='text'
        placeholder='Código secreto'
        className={`w-3/4 px-2 py-1 border-2 ${errors.secretKey ? 'border-red-600' : 'border-black'} rounded-lg outline-none`}
        minLength='16'
        maxLength='16'
        {...register('secretKey', {
          required: true,
          minLength: { value: 16, message: 'El código requiere 16 caracteres.' },
          maxLength: '16'
        })}
      />
      <p className='font-bold text-white'>{errors.secretKey?.message}</p>
      <button className='px-2 text-xl font-bold text-white bg-blue-600 border-2 border-white rounded-lg'>Enviar</button>
      {response && <p className='text-lg font-bold text-white'>{response}</p>}
    </form>
  )
}

export default SearchForm
