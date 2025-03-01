import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface YearRangeState{
    YearRange: [number, number]
}

const initialState: YearRangeState = {
    YearRange: [0,0]
};

export const YearRangeSlice = createSlice({
    name: "yearRange",
    initialState,
    reducers: {
        setYearRangeInStore:(state, action: PayloadAction<{ yearRange: [number, number] }>) => 
         {
             state.YearRange = action.payload.yearRange;
        },
    },
  });

  export const { setYearRangeInStore } = YearRangeSlice.actions;
  export default YearRangeSlice.reducer;