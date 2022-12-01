import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {hitAPI} from "../services/HitsService";
import {userAPI} from "../services/AuthService";
import {CoordinatesSlice} from "./reducers/FormCoordinatesSlice";

const rootReducer = combineReducers({
    coordinates: CoordinatesSlice.reducer,
    [hitAPI.reducerPath]: hitAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(hitAPI.middleware, userAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']