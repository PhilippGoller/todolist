import Modal from "../modal/Modal";
import { useIsMobileContext } from "../../hooks/useIsMobileContext";
import PropTypes from "prop-types";
import styles from "./Page.module.css";

/**
 * A component that wraps the page content providing basic layout structure.
 */
export const Page = ({ children }) => (
    <div className={styles.page}>
        {children}
    </div>
);

Page.propTypes = {
    /**
     * Child elements to be displayed on the page.
     */
    children: PropTypes.node,
};

/**
 * Applies basic layout structure to the master component in a master-detail view.
 */
export const Master = ({children}) => (
    <div className={styles.master}>{children}</div>
);

Master.propTypes = {
    /**
     * Child elements to be displayed within the master component.
     */
    children: PropTypes.node,
};

/**
 * Applies basic layout structure to the detail component in a master-detail view.
 */
export const Detail = ({ children, show = false, onClose }) => {
    const isMobile = useIsMobileContext();
    
    if(!show) {
        return "";
    }

    return isMobile ? (<Modal show={true} onClose={onClose}>{children}</Modal>) : (<div className={styles.detail}>{children}</div>);
};

Detail.propTypes = {
    /**
     * Child elements to be displayed within the detail component.
     */
    children: PropTypes.node,
    /**
     * Whether or not to display the detail component.
     */
    show: PropTypes.bool,
    /**
     * Callback fired when the user closes the detail component.
     */
    onClose: PropTypes.func.isRequired,
};