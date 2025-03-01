import { useState } from "react";
import Select, { MultiValue } from "react-select"
import makeAnimated from 'react-select/animated';
import { Option } from "../../types";
import { CustomSelectorStyles, CountrySelectorOptions } from "./SelectorConstants";
import { useAppDispatch } from "../../store/store";
import { setCountryOptions } from "../../store/slices/SelectedCountriesSlice";

const animatedComponents = makeAnimated();

const MultiSelect = () => {
    
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>([]);
  const dispatch = useAppDispatch();

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
      styles={CustomSelectorStyles}
    />
  );
}

export default MultiSelect;