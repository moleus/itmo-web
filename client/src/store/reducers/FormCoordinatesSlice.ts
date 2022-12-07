import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from "@reduxjs/toolkit";

export interface CoordinatesFormState {
    scaleRadius: number;
}

const initialState: CoordinatesFormState = {
    scaleRadius: 1,
}

const coordinatesSlice = createSlice({
    name: "coordinates",
    initialState,
    reducers: {
        setR: (state: CoordinatesFormState, action: PayloadAction<number>) => {
            state.scaleRadius = action.payload
        }
    }
});

const { actions, reducer: coordinatesReducer } = coordinatesSlice;
export const {setR} = actions;

export default coordinatesReducer;