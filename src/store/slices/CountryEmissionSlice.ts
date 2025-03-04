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
            const emissionsData = await GetEmissionData(country.key);
            const populationData = await GetPopulationData(country.key);

            const combinedData: EmissionByYear[] = emissionsData.map((emissionEntry: EmissionData) => {
                const matchingPopulation = populationData.find(
                  (populationEntry: PopulationData) => emissionEntry.date === populationEntry.date
                );
              
                return {
                  year: emissionEntry.date,
                  population: matchingPopulation ? matchingPopulation.value : 1,
                  value: emissionEntry.value,
                  perCapita: Number(((emissionEntry.value / (matchingPopulation ? matchingPopulation.value : 1)) * 1000000).toFixed(4))
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

const GetEmissionData = async (country:string): Promise<EmissionData[]> => {
    const emissionUrl = import.meta.env.VITE_WORLD_BANK_API_EMISSIONS_URL_TEMPLATE;
    const emissionResponse = await fetch(emissionUrl.replace("{countryKey}", country));
    const emissionResponseJson = await emissionResponse.json();
    return emissionResponseJson[1];
}

const GetPopulationData = async (country:string): Promise<EmissionData[]> => {
    const populationUrl = import.meta.env.VITE_WORLD_BANK_API_POPULATION_URL_TEMPLATE;
    const populationResponse = await fetch(populationUrl.replace("{countryKey}", country));
    const populationResponseJson = await populationResponse.json();
    return populationResponseJson[1];
}

export default CountryEmissionSlice.reducer;