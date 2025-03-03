import { EmissionByYear } from "./EmissionByYear";

export interface CountryEmission {
    name: string;
    values: EmissionByYear[];
}
