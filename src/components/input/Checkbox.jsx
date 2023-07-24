import { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./Checkbox.module.css";

/**
 * A custom checkbox component.
 */
const Checkbox = forwardRef(({ onChange, name = "", isChecked = false }, ref) => (
    <label className={styles.checkbox} onClick={event => event.stopPropagation()}>
        <input type="checkbox" onChange={onChange} name={name} checked={isChecked} ref={ref}/>
        <div className={styles.marker}></div>
    </label>
));

Checkbox.propTypes = {
    /**
     * Callback fired when the checkbox is checked or unchecked.
     */
    onChange: PropTypes.func.isRequired,
    /**
     * The name of the checkbox.
     */
    name: PropTypes.string,
    /**
     * Indicates whether the checkbox is currently checked.
     */
    isChecked: PropTypes.bool,
};

export default Checkbox;