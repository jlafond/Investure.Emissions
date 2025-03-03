import { useState } from "react";
import Select, { MultiValue } from "react-select"
import makeAnimated from 'react-select/animated';
import { RootState, useAppDispatch } from "../../store/store";
import { setCountryOptions } from "../../store/slices/SelectedCountriesSlice";
import { useSelector } from "react-redux";
import { Option } from "../../types/Option";

export const MultiSelect = () => {
    
  const animatedComponents = makeAnimated();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>([]);
  const dispatch = useAppDispatch();

  const CountrySelectorOptions: Option[] = JSON.parse(import.meta.env.VITE_SELECTABLE_COUNTRIES);

  const handleChange = (selected: MultiValue<Option>) => {
    if (selected.some((option) => option.value === "ALL")) 
    {
        const filteredOptions = CountrySelectorOptions.filter((option) => option.value !== "ALL")
        setSelectedOptions(filteredOptions);
        dispatch(setCountryOptions({options: filteredOptions}));
    } 
    else 
    {
      setSelectedOptions(selected);
      dispatch(setCountryOptions({options: Array.from(selected)}));
    }
  };

  return (
      <Select
      options={CountrySelectorOptions}
      isMulti
      value={selectedOptions}
      closeMenuOnSelect={false}
      components={animatedComponents}
      onChange={handleChange}
      styles={getCustomSelectorStyles(theme)}
    />    
  );
}

const getCustomSelectorStyles = (theme: "light" | "dark") => ({
  control: (provided: any) => ({
    ...provided,
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
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: theme === "light" ? "#022d5b" : "#f4f7fa",
    color: theme === "light" ? "#f4f7fa" : "#022d5b",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: theme === "light" ? "#f4f7fa" : "#022d5b",
  }),
});
