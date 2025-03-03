import { useState } from "react";
import Select, { SingleValue } from "react-select"
import makeAnimated from 'react-select/animated';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Option } from "../../types/Option";

interface SelectorProps {
    onChange: (value: string) => void; // Callback function type
  }

export const SingleSelect: React.FC<SelectorProps> = ({ onChange }) => {
    const countries: string[] = useSelector(
        (state: RootState) => state.selectedCountries.CountryOptions
    );
    const theme = useSelector((state: RootState) => state.theme.theme);

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
        <>
            {shouldShow && 
            <Select
                options={SelectorOptions}
                value={selectedCountry}
                closeMenuOnSelect={true}
                components={animatedComponents}
                onChange={(newValue) => handleChange(newValue as SingleValue<Option>)}
                styles={getCustomSelectorStyles(theme)}
            />
            }
        </>
    );
}

const getCustomSelectorStyles = (theme: "light" | "dark") => ({
  control: (provided: any) => ({
    ...provided,
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5);",
    borderColor: theme === "light" ? "#EFEFEF" : "#022d5b",
    backgroundColor: theme === "light" ? "#EFEFEF" : "#022d5b",
    "&:hover": {
      boxShadow: "0 2px 5px rgba(0, 0, 0, 1);",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: theme === "light" ? "#EFEFEF" : "#022d5b",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5);",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? theme === "light" ? "#FAFAFA" : "#143c67"
      : theme === "light" ? "#EFEFEF" : "#022d5b",
    color: theme === "light" ? "#022d5b" : "#f4f7fa",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    backgroundColor: theme === "light" ? "#EFEFEF" : "#022d5b",
    color: theme === "light" ? "#022d5b" : "#f4f7fa",
  })
});