import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../store/slices/ThemeSlice";
import Switch from "react-switch";
import { FaMoon, FaSun } from "react-icons/fa"
import "./styles.scss";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export const ThemeToggle = () => {

    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.theme.theme);
    const [checked, setChecked] = useState(theme === 'light'); //default to user local storage theme

    const handleChange = () => {
        setChecked(!checked) //toggle component
        dispatch(toggleTheme()) //set page theme
    };

    const handleChangeFake = () => {
        //react-switch needed onChange event, intention was to handle click on entire component. When switch changes, do not want any further changes to occur.
    };

    return (
        <div className="theme_toggle_container" onClick={handleChange}>
            <FaMoon className="theme_toggle_container__item" size={20} />
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
            <FaSun className="theme_toggle_container__item" size={20}/>
        </div>
    );
};
