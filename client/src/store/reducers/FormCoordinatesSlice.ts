import {createSlice} from "@reduxjs/toolkit";

export interface CoordinatesFormState {
    radius: number;
}

const initialState: CoordinatesFormState = {
    radius: 1,
}


export const CoordinatesSlice = createSlice({
    name: "coordinates",
    initialState: initialState,
    reducers: {
        setR: (state, action) => state.radius = action.payload
    }
});
