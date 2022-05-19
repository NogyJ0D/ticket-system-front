import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import ticketsReducer from '../features/ticketsSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    tickets: ticketsReducer
  }
})

export default store
