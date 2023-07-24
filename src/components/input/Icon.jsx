import PropTypes from "prop-types";
import styles from "./Icon.module.css";

/**
 * Renders a custom icon component.
 */
const Icon = ({ type, size, color }) => (
    <i className={`fa-solid ${type} ${styles[size]} ${styles[color]}`}></i>
);

Icon.propTypes = {
    /**
     * The type of the icon to be rendered.
     */
    type: PropTypes.string.isRequired,
    /**
     * The size of the icon to be rendered.
     */
    size: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    /**
     * The color of the icon to be rendered.
     */
    color: PropTypes.oneOf(["black", "grey", "white"]).isRequired,
};

Icon.type = {};
Icon.type.ADD = "fa-plus";
Icon.type.ARROW_DOWN = "fa-angle-down";
Icon.type.ARROW_LEFT = "fa-angle-left";
Icon.type.ARROW_RIGHT = "fa-angle-right";
Icon.type.ARROW_UP = "fa-angle-up";
Icon.type.ARROW_BACKWARD = "fa-arrow-left";
Icon.type.ARROW_FORWARD = "fa-arrow-right";
Icon.type.CLOSE = "fa-xmark";
Icon.type.DELETE = "fa-trash";
Icon.type.EDIT = "fa-pen-to-square";
Icon.type.HAMBURGER = "fa-bars";
Icon.type.SEARCH = "fa-magnifying-glass";
Icon.type.CALENDAR = "fa-calendar";
Icon.type.CALENDAR_DAY = "fa-calendar-day";
Icon.type.CALENDAR_DAYS = "fa-calendar-days";
Icon.type.CALENDAR_WEEK = "fa-calendar-week";

Icon.size = {};
Icon.size.SMALL = "small";
Icon.size.MEDIUM = "medium";
Icon.size.LARGE = "large";

Icon.color = {};
Icon.color.BLACK = "black";
Icon.color.GREY = "grey";
Icon.color.WHITE = "white";

export default Icon;