import "./styles.scss";
import { ThemeToggle } from "../theme-toggle";

const NavBar = () => {

    return (
        <div>
            <nav className={'navbar'}>
                <div className="navbar__container">
                    <div className="navbar__header">
                        Greenhouse Emissions
                    </div>           
                </div>
                <div className="navbar__container__items">
                    <ThemeToggle />
                </div>  
            </nav>
        </div>
    )
}

export default NavBar;