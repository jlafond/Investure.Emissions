import { configureStore } from "@reduxjs/toolkit"
import  { CountryEmissionSlice } from "./slices/CountryEmissionSlice"
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux"
import { CountrySelectedSlice } from "./slices/SelectedCountriesSlice";
import { YearRangeSlice } from "./slices/YearRangeSlice";

export const store=configureStore({
    reducer:{
        countryEmissionData: CountryEmissionSlice.reducer,
        selectedCountries: CountrySelectedSlice.reducer,
        yearRange: YearRangeSlice.reducer
    }
})

export const useAppDispatch:()=>typeof store.dispatch = useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;