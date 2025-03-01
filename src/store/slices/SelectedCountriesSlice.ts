import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Option } from "../../types";

interface CountryOptionsState{
    CountryOptions: Option[]
}

const initialState: CountryOptionsState = {
    CountryOptions: []
};

export const CountrySelectedSlice = createSlice({
    name: "countrySelected",
    initialState,
    reducers: {
        setCountryOptions:(state, action: PayloadAction<{ options: Option[] }>) => 
         {
             state.CountryOptions = action.payload.options
        },
    },
  });

  export const { setCountryOptions } = CountrySelectedSlice.actions;
  export default CountrySelectedSlice.reducer;