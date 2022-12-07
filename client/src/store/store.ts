import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {hitAPI} from "../api/hitsService";
import {userAPI} from "../api/authService";
import coordinatesReducer from "./reducers/FormCoordinatesSlice";

const rootReducer = combineReducers({
    coordinatesReducer,
    [hitAPI.reducerPath]: hitAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(hitAPI.middleware).concat(userAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']