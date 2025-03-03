import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Option } from "../../types/Option";

interface CountryOptionsState{
    CountryOptions: string[]
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
             state.CountryOptions = action.payload.options.map(option=> option.label)
        },
    },
  });

  export const { setCountryOptions } = CountrySelectedSlice.actions;
  export default CountrySelectedSlice.reducer;