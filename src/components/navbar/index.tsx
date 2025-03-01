import { useState } from "react";
import "./styles.scss";
import { FaBars } from "react-icons/fa";
import { HiX } from "react-icons/hi";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div>
            <div className="navbar_icon" onClick={toggleSidebar}>
                {
                    isOpen ? <HiX size={30} /> : <FaBars size={30} />
                }
            </div>
            <nav className={`navbar ${isOpen ? 'active' : ''}`}>
                <div className="navbar__container">
                    <div className="navbar__header">
                        Greenhouse Emissions
                    </div>
                                            
                </div>
            </nav>
        </div>
    )
}

export default NavBar;