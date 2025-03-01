import { useState } from "react";
import Select, { SingleValue } from "react-select"
import makeAnimated from 'react-select/animated';
import { Option } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface SelectorProps {
    onChange: (value: string) => void; // Callback function type
  }

export const SingleSelect: React.FC<SelectorProps> = ({ onChange }) => {
    const countries: string[] = useSelector(
        (state: RootState) => state.selectedCountries.CountryOptions
    );

    const animatedComponents = makeAnimated();
    const shouldShow = countries.length > 0;

    const [selectedCountry, setSelectedCountry] = useState<SingleValue<Option>>(shouldShow ? ({ label: countries[0], value: countries[0] }) : null);

    const SelectorOptions: Option[] =  countries.map(item => ({
        label: item,
        value: item
    }));

    const handleChange = (selected: SingleValue<Option>) => {
        setSelectedCountry(selected);
        onChange(selected?.value ?? (shouldShow ? countries[0] : ""));
    };

    return (
        <div>
            {shouldShow && 
            <Select
                options={SelectorOptions}
                value={selectedCountry}
                closeMenuOnSelect={true}
                components={animatedComponents}
                onChange={(newValue) => handleChange(newValue as SingleValue<Option>)}
                styles={CustomSelectorStyles}
            />
            }
        </div>
    );
}


const CustomSelectorStyles = {
    control: (provided: any) => ({
      ...provided,
      borderColor: getComputedStyle(document.documentElement).getPropertyValue("--main-theme-main-color").trim(),
      backgroundColor: getComputedStyle(document.documentElement).getPropertyValue("--main-theme-main-color").trim(),
      "&:hover": {
        boxShadow: "0 2px 5px rgba(0, 0, 0, 1);",
      }
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: getComputedStyle(document.documentElement).getPropertyValue("--main-theme-main-color").trim(),
      boxShadow: getComputedStyle(document.documentElement).getPropertyValue("--main-theme-box-shadow").trim(),
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? getComputedStyle(document.documentElement).getPropertyValue("--main-theme-background-color").trim() 
        : getComputedStyle(document.documentElement).getPropertyValue("--main-theme-main-color").trim(),
      color: getComputedStyle(document.documentElement).getPropertyValue("--main-theme-light-text-color").trim(),
    }),
    singleValue: (provided: any) => ({
      ...provided,
      backgroundColor: getComputedStyle(document.documentElement).getPropertyValue("--main-theme-main-color").trim(),
      color: getComputedStyle(document.documentElement).getPropertyValue("--main-theme-light-text-color").trim(),
    })
  };