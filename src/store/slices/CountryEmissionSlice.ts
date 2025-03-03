import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { EmissionByYear } from '../../types/EmissionByYear'
import { CountryEmission } from '../../types/CountryEmission'
import { StringDictionary } from '../../types/StringDictionary'

interface CountryEmissionState{
    Countries: CountryEmission[]
}

const initialState:CountryEmissionState = {
    Countries: []
}

const GetCountryDictionary = (): StringDictionary[] => {
    const fromConfig = import.meta.env.VITE_COUNTRY_DICTIONARY;
    if(!fromConfig)
        return [];
    try{
        return JSON.parse(fromConfig);
    }
    catch (err){
        console.log(err);
        return [];
    }
}

interface PopulationData {
    date: string;
    value: number;
  }
  
  interface EmissionData {
    date: string;
    value: number;
  }

export const fetchCountries = createAsyncThunk('country/fetch', async ()=>{
    let countryData: CountryEmission[] = [];
    
    let dictionary = GetCountryDictionary();

    for (const country of dictionary) {
        try
        {
            const emissionUrl = import.meta.env.VITE_WORLD_BANK_API_EMISSIONS_URL_TEMPLATE;
            const emissionResponse = await fetch(emissionUrl.replace("{countryKey}", country.key));
            const emissionResponseJson = await emissionResponse.json();
            const emissionsData = emissionResponseJson[1];

            const populationUrl = import.meta.env.VITE_WORLD_BANK_API_POPULATION_URL_TEMPLATE;
            const populationResponse = await fetch(populationUrl.replace("{countryKey}", country.key));
            const populationResponseJson = await populationResponse.json();
            const populationData = populationResponseJson[1];

            const combinedData: EmissionByYear[] = populationData.map((populationEntry: PopulationData) => {
                const matchingEmission = emissionsData.find(
                  (emissionEntry: EmissionData) => emissionEntry.date === populationEntry.date
                );
              
                return {
                  year: populationEntry.date,
                  population: populationEntry.value,
                  value: matchingEmission ? matchingEmission.value : 0,
                  perCapita: ((matchingEmission ? matchingEmission.value : 0) / populationEntry.value) * 1000000
                };
              });
            
            const countryEmission: CountryEmission = {
                name: country.value,
                values: combinedData,
            };
            countryData.push(countryEmission);
        }
        catch (err){
            console.log(err);
        }
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