import { configureStore } from '@reduxjs/toolkit'
import { todosSlice } from './features/todos/todosSlice'
import { coinsSlice } from './features/coins/coinsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      todos: todosSlice.reducer,
      coins: coinsSlice.reducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']