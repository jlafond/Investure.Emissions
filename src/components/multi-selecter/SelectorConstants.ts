import { Option } from "../../types";

//TODO: Future enhancement, retrieve from configurable data store
export const selectAllOption: Option = { value: "ALL", label: "Select All" };
export const CountrySelectorOptions: Option[] = [
  selectAllOption,
  { value: "BRA", label: "Brazil" },
  { value: "CHN", label: "China" },
  { value: "FRA", label: "France" },
  { value: "IND", label: "Indonesia" },
  { value: "JPN", label: "Japan" },
  { value: "USA", label: "USA" },
];

export const CustomSelectorStyles = {
  control: (provided: any) => ({
    ...provided,
    borderColor: getComputedStyle(document.documentElement).getPropertyValue("--main-theme-background-color").trim(),
    backgroundColor: getComputedStyle(document.documentElement).getPropertyValue("--main-theme-background-color").trim(),
    "&:hover": {
      boxShadow: "0 2px 5px rgba(0, 0, 0, 1);",
    }
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: getComputedStyle(document.documentElement).getPropertyValue("--main-theme-background-color").trim(),
    boxShadow: getComputedStyle(document.documentElement).getPropertyValue("--main-theme-box-shadow").trim(),
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? getComputedStyle(document.documentElement).getPropertyValue("--main-theme-main-color").trim() 
      : getComputedStyle(document.documentElement).getPropertyValue("--main-theme-background-color").trim(),
    color: getComputedStyle(document.documentElement).getPropertyValue("--main-theme-light-text-color").trim(),
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: getComputedStyle(document.documentElement).getPropertyValue("--main-theme-light-text-color").trim(),
    color: getComputedStyle(document.documentElement).getPropertyValue("--main-theme-background-color").trim(),
  })
};