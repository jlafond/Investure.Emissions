export interface EmissionByYear {
    year: string;
    value: number;
  }
  
export interface CountryEmission {
    name: string;
    values: EmissionByYear[];
}

export interface StringDictionary { 
    key: string; 
    value: string;
}

export interface Option{ 
    value: string; 
    label: string 
};