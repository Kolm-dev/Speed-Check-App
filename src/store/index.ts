import {configureStore} from "@reduxjs/toolkit"
import typerReducer from "./typer.slice"

const store = configureStore({
	reducer: {
		typer: typerReducer,
	},
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
