import { useSelector } from "react-redux";
import { CountryEmission } from "../../types";
import "./styles.scss";
import { RootState } from "../../store/store";
import { useMemo, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { BiStats } from "react-icons/bi";
import { AiOutlineVerticalAlignMiddle } from "react-icons/ai";

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

    const [selectedCountry, setSelectedCountry] = useState(countries[0]);

    const handleCountryChange = (value: string) => {
        setSelectedCountry(value);
    }

    const max = useMemo(() => {
        return GetMax(data, selectedCountry, yearRange);
      }, [data, selectedCountry, yearRange]);

      const min = useMemo(() => {
        return GetMin(data, selectedCountry, yearRange);
      }, [data, selectedCountry, yearRange]);

      const mean = useMemo(() => {
        return GetMean(data, selectedCountry, yearRange);
      }, [data, selectedCountry, yearRange]);

    const median = useMemo(() => {
        return GetMedian(data, selectedCountry, yearRange);
    }, [data, selectedCountry, yearRange]);

    return(
        <div className="country_stats_container">
            <div className="country_stats_container__stat__max">
                <span>{max}</span>
                <FaArrowUp color="#ee6666" size={32} />
            </div>
            <div className="country_stats_container__stat__min">
                <span>{min}</span>
                <FaArrowDown color="#91cc75" size={32} />
            </div>
            <div className="country_stats_container__stat__mean">
                <span>{mean}</span>
                <BiStats color="#fac858" size={32} />
            </div>
            <div className="country_stats_container__stat__median">
                <span>{median}</span>
                <AiOutlineVerticalAlignMiddle color="#73c0de" size={32} />
            </div>
        </div>
    );

}

const GetMax = (data: CountryEmission[], selectedCountry: string, yearRange: number[]) => {
    const filteredValues = data.find(item => item.name === selectedCountry)?.values
            .filter(x => Number(x.year) >= yearRange[0] && Number(x.year) <= yearRange[1])
            .map(x => x.value);
    return filteredValues?.reduce((max, num) => (num > max ? num : max), -Infinity) ?? 0;
}

const GetMin = (data: CountryEmission[], selectedCountry: string, yearRange: number[]) => {
    const filteredValues = data.find(item => item.name === selectedCountry)?.values
            .filter(x => Number(x.year) >= yearRange[0] && Number(x.year) <= yearRange[1])
            .map(x => x.value);
    console.log(filteredValues);
    return filteredValues?.reduce((min, num) => (num < min ? num : min), Infinity) ?? 0;
}

const GetMean = (data: CountryEmission[], selectedCountry: string, yearRange: number[]) => {
    const filteredValues = data.find(item => item.name === selectedCountry)?.values
            .filter(x => Number(x.year) >= yearRange[0] && Number(x.year) <= yearRange[1])
            .map(x => x.value);
    const sum = filteredValues?.reduce((sum, num) => sum + num, 0) ?? 0;
    return (filteredValues?.length ?? 0) > 0 ? sum / (filteredValues?.length ?? 1) : 0;
}

const GetMedian = (data: CountryEmission[], selectedCountry: string, yearRange: number[]) => {
    const filteredValues = data.find(item => item.name === selectedCountry)?.values
            .filter(x => Number(x.year) >= yearRange[0] && Number(x.year) <= yearRange[1])
            .map(x => x.value);
    
    if (filteredValues == undefined || filteredValues.length === 0) return null;

    const sortedNumbers = filteredValues.sort((a, b) => a - b);

    const midIndex = Math.floor(sortedNumbers.length / 2);

    if (sortedNumbers.length % 2 === 0) {
        return (sortedNumbers[midIndex - 1] + sortedNumbers[midIndex]) / 2;
    } else {
        return sortedNumbers[midIndex];
    }
}