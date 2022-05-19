import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')

  const onSubmit = async ({ email, password }) => {
    // console.table(data)
    const { payload: request } = await dispatch(login({ email, password }))
    console.log(request)
    if (!request.username) return setMessage(request)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center w-3/4 gap-2 p-4 bg-blue-500 border-4 border-black rounded-xl'
    >
      <h3 className='text-xl font-bold text-white'>Inicia sesión:</h3>
      <input
        type='email'
        placeholder='Email'
        className={`w-3/4 px-2 py-1 border-2 ${errors.email ? 'border-red-600' : 'border-black'} rounded-lg outline-none`}
        {...register('email', { required: true })}
      />
      <input
        type='password'
        placeholder='Contraseña'
        className={`w-3/4 px-2 py-1 border-2 ${errors.username ? 'border-red-600' : 'border-black'} rounded-lg outline-none`}
        {...register('password', { required: true })}
      />

      <button className='px-2 text-xl font-bold text-white bg-blue-600 border-2 border-white rounded-lg'>Enviar</button>
      {message && <p className='text-lg font-bold text-white'>{message}</p>}
    </form>
  )
}

export default LoginForm
