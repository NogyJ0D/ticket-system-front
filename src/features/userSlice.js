import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { post } from '../api'

export const login = createAsyncThunk('user/login', ({ email, password }, thunkAPI) => {
  return post('/auth/login', { email, password })
    .then(res => {
      console.log(res)
      if (res.fail) return thunkAPI.rejectWithValue(res.message)
      return res
    })
})

export const validate = createAsyncThunk('user/validate', (data, thunkAPI) => {
  return post('/auth/validate')
    .then(res => {
      if (!res.email) return thunkAPI.rejectWithValue(res.message)
      return res
    })
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: true,
    error: false,
    message: undefined,
    logged: false,

    username: undefined,
    email: undefined,
    role: undefined,
    id: undefined,
    firstname: undefined,
    lastname: undefined
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => { state.loading = true })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = false
      state.logged = true

      state.username = payload.username
      state.email = payload.email
      state.role = payload.role
      state.id = payload.id
      state.firstname = payload.firstname
      state.lastname = payload.lastname
    })
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.logged = false
      state.message = payload
    })

    builder.addCase(validate.pending, (state, action) => { state.loading = true })
    builder.addCase(validate.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = false
      state.logged = true

      state.username = payload.username
      state.email = payload.email
      state.role = payload.role
      state.id = payload.id
      state.firstname = payload.firstname
      state.lastname = payload.lastname
    })
    builder.addCase(validate.rejected, (state, action) => {
      state.loading = false
      state.logged = false

      state.username = undefined
      state.email = undefined
      state.role = undefined
      state.id = undefined
      state.firstname = undefined
      state.lastname = undefined
    })
  }
})

export default userSlice.reducer
