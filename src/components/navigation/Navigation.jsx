import { useRef } from "react";
import Icon from "../input/Icon";
import { NavLink } from "react-router-dom";
import CategoryList from "../category/CategoryList";
import { useIsMobileContext } from "../../hooks/useIsMobileContext";
import PropTypes from "prop-types";
import styles from "./Navigation.module.css";

/**
 * Renders the navigation links to the pages.
 */
const PageList = () => (
    <ul>
        <li>
            <NavLink to="/today" className={({ isActive }) => isActive ? styles.active : ""}>
                <Icon type={Icon.type.CALENDAR_DAY} size={Icon.size.MEDIUM} color={Icon.color.BLACK}/>
                <span>Heute</span>
            </NavLink>
        </li>
        <li>
            <NavLink to="/week" className={({ isActive }) => isActive ? styles.active : ""}>
                <Icon type={Icon.type.CALENDAR_WEEK} size={Icon.size.MEDIUM} color={Icon.color.BLACK}/>
                <span>Diese Woche</span>
            </NavLink>
        </li>
        <li>
            <NavLink to="/month" className={({ isActive }) => isActive ? styles.active : ""}>
                <Icon type={Icon.type.CALENDAR_DAYS} size={Icon.size.MEDIUM} color={Icon.color.BLACK}/>
                <span>Monatsansicht</span>
            </NavLink>
        </li>
        <li>
            <NavLink to="/all" className={({ isActive }) => isActive ? styles.active : ""}>
                <Icon type={Icon.type.CALENDAR} size={Icon.size.MEDIUM} color={Icon.color.BLACK}/>
                <span>Alle</span>
            </NavLink>
        </li>
    </ul>
);

/**
 * Renders the desktop navigation.
 */
const DesktopNavigation = ({ show }) => (
    <nav className={show ? `${styles.navigation} ${styles.show}` : styles.navigation}>
        <PageList />
        <CategoryList />
    </nav>
);

DesktopNavigation.propTypes = {
    /**
     * A boolean indicating if the navigation should be displayed.
     */
    show: PropTypes.bool.isRequired,
};

/**
 * Renders the mobile navigation.
 */
const MobileNavigation = ({ show, onClose }) => {
    const navigation = useRef();

    const handleClick = event => {
        if(navigation.current.contains(event.target) && event.target.closest("a") && !event.target.closest("button")) {
            onClose();
        }
    }

    return (
        <nav ref={navigation} onClick={handleClick} className={show ? `${styles.navigation} ${styles.show}` : styles.navigation}>
            <PageList />
            <CategoryList />
        </nav>
    );
};

MobileNavigation.propTypes = {
    /**
     * A boolean indicating if the navigation should be displayed.
     */
    show: PropTypes.bool.isRequired,
    /**
     * Callback fired when the navigation is closed.
     */
    onClose: PropTypes.func.isRequired,
};

/**
 * Renders the mobile or desktop navigation based on the isMobile value from the IsMobileContext. 
 */
const Navigation = ({ show = true, onClose }) => {
    const isMobile = useIsMobileContext();

    return isMobile ? (<MobileNavigation show={!show} onClose={onClose} />) : (<DesktopNavigation show={show} />);
};

Navigation.propTypes = {
    /**
     * A boolean indicating if the navigation should be displayed.
     */
    show: PropTypes.bool,
    /**
     * Callback fired when the navigation is closed.
     */
    onClose: PropTypes.func.isRequired,
};

export default Navigation;