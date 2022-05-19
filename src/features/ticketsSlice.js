import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, put } from '../api'

export const getTicketByNumber = createAsyncThunk('tickets/getTicketByNumber', ({ ticketNumber, secretKey }, thunkAPI) => {
  return get(`/tickets/number/${ticketNumber}/secret-key/${secretKey}`)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.message)
      return res
    })
})

export const getTickets = createAsyncThunk('tickets/getTickets', ({ filter, param, page, limit }, thunkAPI) => {
  return get(`/tickets/?filter=${filter}&param=${param}&page=${page}&limit=${limit}`)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.message)
      return res
    })
})

export const markViewed = createAsyncThunk('tickets/markViewed', (id, thunkAPI) => {
  return put(`/tickets/view/${id}`)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.message)
      return res
    })
})

export const markClosed = createAsyncThunk('tickets/markClosed', ({ id, summary }, thunkAPI) => {
  return put(`/tickets/close/${id}`, { summary })
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.message)
      return res
    })
})

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    loading: true,
    error: false,
    message: undefined,

    docs: [],
    hasNextPage: false,
    hasPrevPage: false,
    limit: undefined,
    nextPage: undefined,
    offset: undefined,
    page: undefined,
    pagingCounter: undefined,
    prevPage: undefined,
    totalDocs: undefined,
    totalPages: undefined,
    filter: undefined,
    param: undefined,

    selectedTicket: undefined
  },
  reducers: {
    clearSelectedTicket (state, action) {
      state.error = false
      state.message = undefined
      state.loading = false
      state.selectedTicket = undefined
    },
    setSelectedTicket (state, { payload }) {
      state.error = false
      state.message = undefined
      state.loading = false
      state.selectedTicket = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTicketByNumber.pending, (state, action) => { state.loading = true })
    builder.addCase(getTicketByNumber.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = false
      state.message = undefined

      state.selectedTicket = payload
    })
    builder.addCase(getTicketByNumber.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload

      state.selectedTicket = undefined
    })

    builder.addCase(getTickets.pending, (state, action) => { state.loading = true })
    builder.addCase(getTickets.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = false
      state.message = undefined

      state.docs = payload.docs
      state.hasNextPage = payload.hasNextPage
      state.hasPrevPage = payload.hasPrevPage
      state.limit = payload.limit
      state.nextPage = payload.nextPage
      state.offset = payload.offset
      state.page = payload.page
      state.pagingCounter = payload.pagingCounter
      state.prevPage = payload.prevPage
      state.totalDocs = payload.totalDocs
      state.totalPages = payload.totalPages
      state.filter = payload.filter
      state.param = payload.param
    })

    builder.addCase(markViewed.pending, (state, action) => { state.loading = true })
    builder.addCase(markViewed.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = false
      state.message = payload.message

      state.selectedTicket = payload.ticket
    })
    builder.addCase(markViewed.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload.message
    })

    builder.addCase(markClosed.pending, (state, action) => { state.loading = true })
    builder.addCase(markClosed.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = false
      state.message = payload.message

      state.selectedTicket = payload.ticket
    })
    builder.addCase(markClosed.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload.message
    })
  }
})

export const { clearSelectedTicket, setSelectedTicket } = ticketsSlice.actions
export default ticketsSlice.reducer
