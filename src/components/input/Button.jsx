import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

/**
 * Renders a default button.
 */
export const Button = ({ onClick, children, background = "#ffffff" }) => (
    <button type="button" className={`${styles.button} ${styles.default}`} 
        style={{background}} onClick={onClick}>{children}</button>
);

Button.propTypes = {
    /**
     * Callback fired when the button is clicked.
     */
    onClick: PropTypes.func.isRequired,
    /**
     * Text, components or elements rendered inside the button.
     */
    children: PropTypes.node.isRequired,
    /**
     * Background color of the button.
     */
    background: PropTypes.string,
};

/**
 * Renders a submit button.
 */
export const SubmitButton = ({ onClick, children }) => (
    <button type="submit" className={`${styles.button} ${styles.submit}`} onClick={onClick}>{children}</button>
);

SubmitButton.propTypes = {
    /**
     * Callback fired when the button is clicked.
     */
    onClick: PropTypes.func.isRequired,
    /**
     * Text, components or elements rendered inside the button.
     */
    children: PropTypes.node.isRequired,
};

/**
 * Renders an icon button.
 */
export const IconButton = ({ onClick, icon }) => (
    <button  type="button" className={`${styles.button} ${styles.icon}`} onClick={onClick}>{icon}</button>
);

IconButton.propTypes = {
    /**
     * Callback fired when the button is clicked.
     */
    onClick: PropTypes.func.isRequired,
    /**
     * The icon component to be rendered inside the button.
     */
    icon: PropTypes.element.isRequired,
};


/**
 * Renders a toggle button.
 */
export const ToggleButton = ({ onClick, icon }) => {
    const [isToggled, setIsToggled] = useState(false);

    const handleClick = () => {
        setIsToggled(previousState => !previousState);
        onClick();
    };

    return (
        <button type="button" className={`${styles.button} ${styles.icon} ${isToggled ? styles.rotate : styles.rotateBack}`} 
            onClick={handleClick}>{icon}</button>
    );
};

ToggleButton.propTypes = {
    /**
     * Callback fired when the button is clicked.
     */
    onClick: PropTypes.func.isRequired,
    /**
     * The icon component to be rendered inside the button.
     */
    icon: PropTypes.element.isRequired,
};

/**
 * Renders a button for the titlebar toolbar.
 */
export const ToolbarButton = ({ onClick, icon }) => (
    <button  type="button" className={`${styles.button} ${styles.toolbar}`} onClick={onClick}>{icon}</button>
);

ToolbarButton.propTypes = {
    /**
     * Callback fired when the button is clicked.
     */
    onClick: PropTypes.func.isRequired,
    /**
     * The icon component to be rendered inside the button.
     */
    icon: PropTypes.element.isRequired,
};