import { useDispatch } from "react-redux";
import { MultiSelect } from "../multi-selecter";
import { YearRangeSlider } from "../year-slider";
import "./styles.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import { togglePerCapita } from "../../store/slices/IsPerCapitaSlice";
import Switch from "react-switch";

export const ContentMenu = () => {

    const dispatch = useDispatch();
    const isPerCapita = useSelector((state: RootState) => state.isPerCapita.isPerCapita);
    const [checked, setChecked] = useState(isPerCapita); //default to user local storage theme

    const handleChange = () => {
            setChecked(!checked) //toggle component
            dispatch(togglePerCapita()) //set page theme
    };

    const handleChangeFake = () => {
        //react-switch needed onChange event, intention was to handle click on entire component. When switch changes, do not want any further changes to occur.
    };

    return (
        <div className="content_menu">
            <div className="content_menu__dropdown_container">
                <div className="content_menu__dropdown_container__header">
                    Country(s)
                </div>
                <MultiSelect/>
            </div>
            <div className="content_menu__slider_container">
                <div className="content_menu__slider_container__header">
                    Year(s)
                </div>
                <YearRangeSlider/>
            </div>
            <div className="content_menu__perCapita_container" onClick={handleChange}>
                <div className="content_menu__perCapita_container__title">
                Per Capita?
                </div>
                <Switch
                    className="theme_toggle_container__item"
                    checked={checked}
                    onChange={handleChangeFake}
                    onColor="#ff9f1c"
                    onHandleColor="#022d5b"
                    handleDiameter={20}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={40}
                />
            </div>
        </div>
    )
}