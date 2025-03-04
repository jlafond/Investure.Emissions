import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useMemo, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { BiStats } from "react-icons/bi";
import { AiOutlineVerticalAlignMiddle } from "react-icons/ai";
import "./styles.scss";
import { SingleSelect } from "../single-selector";
import { CountryEmission } from "../../types/CountryEmission";

// This component is used to return cards displaying high level aggregated emissions values (max, min, mean, median) 
// for a selected country over the selected year range 
export const CountryStats = () => {

    const data: CountryEmission[] = useSelector(
        (state: RootState) => state.countryEmissionData.Countries
    );

    const countries: string[] = useSelector(
        (state: RootState) => state.selectedCountries.CountryOptions
    );

    const yearRange: [number, number] = useSelector(
        (state: RootState) => state.yearRange.YearRange
    );
    const isPerCapita: boolean = useSelector(
        (state: RootState) => state.isPerCapita.isPerCapita
      );

    const [selectedCountry, setSelectedCountry] = useState(countries[0]);

    const handleCountryChange = (value: string) => {
        setSelectedCountry(value);
    }

    const max = useMemo(() => {
        return GetMax(data, selectedCountry, yearRange, isPerCapita);
      }, [data, selectedCountry, yearRange, isPerCapita]);

    const maxYear = isPerCapita ? 
        data.find(item => item.name === selectedCountry)?.values.find(v => v.perCapita === Number(max))?.year ?? 0
        :
        data.find(item => item.name === selectedCountry)?.values.find(v => v.value === Number(max))?.year ?? 0;

    const min = useMemo(() => {
    return GetMin(data, selectedCountry, yearRange, isPerCapita);
    }, [data, selectedCountry, yearRange, isPerCapita]);

    const minYear = isPerCapita ? 
        data.find(item => item.name === selectedCountry)?.values.find(v => v.perCapita === Number(min))?.year ?? 0
        :
        data.find(item => item.name === selectedCountry)?.values.find(v => v.value === Number(min))?.year ?? 0; 

    const mean = useMemo(() => {
    return GetMean(data, selectedCountry, yearRange, isPerCapita);
    }, [data, selectedCountry, yearRange, isPerCapita]);

    const median = useMemo(() => {
        return GetMedian(data, selectedCountry, yearRange, isPerCapita);
    }, [data, selectedCountry, yearRange, isPerCapita]);

    const shouldShow = countries.length > 0;

    return(
        <>
            {shouldShow &&
            <div className="country_stats_container">
                <div className="country_stats_container__selector_container">
                    <SingleSelect onChange={handleCountryChange} />
                </div>
                <div className="country_stats_container__content">
                    <div className="country_stats_container__content__stat">
                        <div className="country_stats_container__content__stat__header">Maximum</div>
                        <div className="country_stats_container__content__stat__container">
                            <div className="country_stats_container__content__stat__container__stat_container">
                                <div className="country_stats_container__content__stat__container__stat_container__year">{maxYear}</div>
                                <div className="country_stats_container__content__stat__container__stat_container__value">{max}</div>
                            </div>
                            
                            <div className="country_stats_container__content__stat__container__icon_container">
                                <FaArrowUp className="country_stats_container__content__stat__container__icon_container__icon" color="#ee6666" size={32} />
                            </div>
                        </div>
                    </div>
                    <div className="country_stats_container__content__stat">
                        <div className="country_stats_container__content__stat__header">Minimum</div>
                        <div className="country_stats_container__content__stat__container">
                            <div className="country_stats_container__content__stat__container__stat_container">
                                <div className="country_stats_container__content__stat__container__stat_container__year">{minYear}</div>
                                <div className="country_stats_container__content__stat__container__stat_container__value">{min}</div>
                            </div>                
                            
                            <div className="country_stats_container__content__stat__container__icon_container">
                                <FaArrowDown className="country_stats_container__content__stat__container__icon_container__icon" color="#91cc75" size={32} />
                            </div>
                        </div>
                    </div>
                    <div className="country_stats_container__content__stat">
                        <div className="country_stats_container__content__stat__header">Mean</div>
                        <div className="country_stats_container__content__stat__container">
                            <div className="country_stats_container__content__stat__container__stat_container">
                                <div className="country_stats_container__content__stat__container__stat_container__year">{yearRange[0]} - {yearRange[1]}</div>
                                <div className="country_stats_container__content__stat__container__stat_container__value">{mean}</div>
                            </div>
                            
                            <div className="country_stats_container__content__stat__container__icon_container">
                                <BiStats className="country_stats_container__content__stat__container__icon_container__icon" color="#fac858" size={32} />
                            </div>
                        </div>
                    </div>
                    <div className="country_stats_container__content__stat">
                        <div className="country_stats_container__content__stat__header">Median</div>
                        <div className="country_stats_container__content__stat__container">
                            <div className="country_stats_container__content__stat__container__stat_container">
                                <div className="country_stats_container__content__stat__container__stat_container__year">{yearRange[0]} - {yearRange[1]}</div>
                                <div className="country_stats_container__content__stat__container__stat_container__value">{median}</div> 
                            </div>
                        
                            <div className="country_stats_container__content__stat__container__icon_container">
                                <AiOutlineVerticalAlignMiddle className="country_stats_container__content__stat__container__icon_container__icon" color="#73c0de" size={32} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    );
}

//Summary: 
//  Function returns the maximum value from the array of CountryEmission 
//  Based on the selected country and year range
//  Params: Array of CountryEmission, country and year range to filter
//  Returns: number value respresenting the maximum value given the constraints
const GetMax = (data: CountryEmission[], selectedCountry: string, yearRange: number[], isPerCapita: boolean) => {
    const filteredValues = data.find(item => item.name === selectedCountry)?.values
            .filter(x => Number(x.year) >= yearRange[0] && Number(x.year) <= yearRange[1])
            .map(x => isPerCapita ? x.perCapita : x.value);
    return filteredValues?.reduce((max, num) => (num > max ? num : max), -Infinity).toFixed(4) ?? 0;
}

//Summary: 
//  Function returns the minimum value from the array of CountryEmission 
//  Based on the selected country and year range
//  Params: Array of CountryEmission, country and year range to filter
//  Returns: number value respresenting the minimum value given the constraints
const GetMin = (data: CountryEmission[], selectedCountry: string, yearRange: number[], isPerCapita: boolean) => {
    const filteredValues = data.find(item => item.name === selectedCountry)?.values
            .filter(x => Number(x.year) >= yearRange[0] && Number(x.year) <= yearRange[1])
            .map(x => isPerCapita ? x.perCapita : x.value);
    return filteredValues?.reduce((min, num) => (num < min ? num : min), Infinity).toFixed(4) ?? 0;
}

//Summary: 
//  Function returns the mean emissions value from the array of CountryEmission 
//  Based on the selected country and year range
//  Params: Array of CountryEmission, country and year range to filter
//  Returns: number value respresenting the mean emissions  value given the constraints
const GetMean = (data: CountryEmission[], selectedCountry: string, yearRange: number[], isPerCapita: boolean) => {
    const filteredValues = data.find(item => item.name === selectedCountry)?.values
            .filter(x => Number(x.year) >= yearRange[0] && Number(x.year) <= yearRange[1])
            .map(x => isPerCapita ? x.perCapita : x.value);
    const sum = filteredValues?.reduce((sum, num) => sum + num, 0) ?? 0;
    return ((filteredValues?.length ?? 0) > 0 ? sum / (filteredValues?.length ?? 1) : 0).toFixed(4);
}

//Summary: 
//  Function returns the median emissions value from the array of CountryEmission 
//  Based on the selected country and year range
//  Params: Array of CountryEmission, country and year range to filter
//  Returns: number value respresenting the median emissions  value given the constraints
const GetMedian = (data: CountryEmission[], selectedCountry: string, yearRange: number[], isPerCapita: boolean) => {
    const filteredValues = data.find(item => item.name === selectedCountry)?.values
            .filter(x => Number(x.year) >= yearRange[0] && Number(x.year) <= yearRange[1])
            .map(x => isPerCapita ? x.perCapita : x.value);
    
    if (filteredValues == undefined || filteredValues.length === 0) return null;

    const sortedNumbers = filteredValues.sort((a, b) => a - b);

    const midIndex = Math.floor(sortedNumbers.length / 2);

    if (sortedNumbers.length % 2 === 0) {
        return ((sortedNumbers[midIndex - 1] + sortedNumbers[midIndex]) / 2).toFixed(4);
    } else {
        return (sortedNumbers[midIndex]).toFixed(4);
    }
}