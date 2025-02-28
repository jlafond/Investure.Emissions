import { configureStore } from "@reduxjs/toolkit"
import  { CountryEmissionSlice } from "./features/CountryEmissionSlice"
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux"

export const store=configureStore({
    reducer:{
        country: CountryEmissionSlice.reducer
    }
})

export const useAppDispath:()=>typeof store.dispatch = useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;