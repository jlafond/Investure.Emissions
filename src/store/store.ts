import { configureStore } from "@reduxjs/toolkit"
import  { CountryEmissionSlice } from "./slices/CountryEmissionSlice"
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux"
import { CountrySelectedSlice } from "./slices/SelectedCountriesSlice";
import { YearRangeSlice } from "./slices/YearRangeSlice";
import { combineReducers } from "redux";
import { ThemeSlice } from "./slices/ThemeSlice";




const rootReducer = combineReducers({
    countryEmissionData: CountryEmissionSlice.reducer,
    selectedCountries: CountrySelectedSlice.reducer,
    yearRange: YearRangeSlice.reducer,
    theme: ThemeSlice.reducer
  });

export const store=configureStore({
    reducer: rootReducer
})

export const useAppDispatch:()=>typeof store.dispatch = useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export type RootState = ReturnType<typeof rootReducer>;