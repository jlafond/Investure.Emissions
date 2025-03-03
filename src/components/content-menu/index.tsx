import { MultiSelect } from "../multi-selecter";
import { YearRangeSlider } from "../year-slider";
import "./styles.scss";


export const ContentMenu = () => {

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
        </div>
    )
}