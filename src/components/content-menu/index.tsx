import { MdSend } from "react-icons/md";
import MultiSelect from "../multi-selecter";
import { YearRangeSlider } from "../year-slider";
import "./styles.scss";

interface ContentMenuProps {
    onButtonClick: () => void;
  }

const ContentMenu: React.FC<ContentMenuProps> = ({ onButtonClick }) => {

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
            <div onClick={onButtonClick} className="content_menu__go_container">
                <MdSend  size={30}/>
            </div>
        </div>
    )
}

export default ContentMenu;