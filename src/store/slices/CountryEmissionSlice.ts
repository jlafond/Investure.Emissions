import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
//import type { PayloadAction } from '@reduxjs/toolkit'
import { COUNTRY_DICTIONARY } from "../../constants"
import { CountryEmission, EmissionByYear } from '../../types'

interface CountryEmissionState{
    Countries: CountryEmission[]
}

const initialState:CountryEmissionState = {
    Countries: []
}

export const fetchCountries = createAsyncThunk('country/fetch', async ()=>{
    let countryData: CountryEmission[] = [];
    
    for (const country of COUNTRY_DICTIONARY) {
        const response = await fetch(`https://api.worldbank.org/v2/country/${country.key}/indicator/EN.GHG.ALL.MT.CE.AR5?format=json`);
        const data = await response.json();
    
        const emissionsData = data[1];

        const emissionValues: EmissionByYear[] = emissionsData.map((item: any) => ({
            year: item.date,
            value: item.value,
          }));
        
        const countryEmission: CountryEmission = {
            name: country.value,
            values: emissionValues,
        };
        countryData.push(countryEmission);
    }
    return countryData;
})

export const CountryEmissionSlice = createSlice({
    name: 'Country',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCountries.fulfilled,(state,action)=>{
            state.Countries = action.payload
        });
    }
})

export default CountryEmissionSlice.reducer;
// export const  { addCountryData } = CountryEmissionSlice.actions;