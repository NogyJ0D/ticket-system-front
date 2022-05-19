import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { post } from '../api'

const TicketForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [response, setResponse] = useState('')

  const onSubmit = async data => {
    // console.table(data)
    const request = await post('/tickets', data)
    // console.log(request)
    setResponse(request.message)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center w-3/4 gap-2 p-4 bg-blue-500 border-4 border-black rounded-xl'
    >
      <h3 className='text-xl font-bold text-white'>Envíanos tu problema:</h3>
      <input
        type='text'
        placeholder='Nombre de usuario'
        className={`w-3/4 px-2 py-1 border-2 ${errors.username ? 'border-red-600' : 'border-black'} rounded-lg outline-none`}
        {...register('username', { required: true })}
      />
      <input
        type='email'
        placeholder='Email'
        className={`w-3/4 px-2 py-1 border-2 ${errors.email ? 'border-red-600' : 'border-black'} rounded-lg outline-none`}
        {...register('email', { required: true })}
      />
      <input
        type='text'
        placeholder='Título'
        maxLength='32'
        className={`w-3/4 px-2 py-1 border-2 ${errors.title ? 'border-red-600' : 'border-black'} rounded-lg outline-none`}
        {...register('title', {
          required: true,
          maxLength: { value: 32, message: 'El título puede contener hasta 32 caracteres.' }
        })}
      />
      <textarea
        placeholder='Problema'
        className={`w-3/4 px-2 py-1 border-2 ${errors.text ? 'border-red-600' : 'border-black'} rounded-lg outline-none`}
        {...register('text', { required: true })}
      />
      <button className='px-2 text-xl font-bold text-white bg-blue-600 border-2 border-white rounded-lg'>Enviar</button>
      {response && <p className='text-lg font-bold text-white'>{response}</p>}
    </form>
  )
}

export default TicketForm
