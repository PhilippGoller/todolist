import { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

/**
 * Renders a default input element.
 */
export const Input = forwardRef(({ label, type = "text", onChange, onBlur, name, value, error = "" }, ref) => (
    <div className={`${styles.textfield} ${!value ? styles.empty : ""}`}>
        <input type={type} onChange={onChange} onBlur={onBlur} name={name} value={value} ref={ref}/>
        <span className={styles.label}>{label}</span>
        { error && <span className={styles.error}>{error}</span> }
    </div>
));

Input.propTypes = {
    /**
     * The label text for the input element.
     */
    label: PropTypes.string.isRequired,
    /**
     * The type attribute for the input element.
     */
    type: PropTypes.string,
    /**
     * Callback fired when the input value changes.
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Callback fired when the input loses focus.
     */
    onBlur: PropTypes.func,
    /**
     * The name attribute of the input element.
     */
    name: PropTypes.string.isRequired,
    /**
     * The value of the input element.
     */
    value: PropTypes.string.isRequired,
    /**
     * The error message to be displayed.
     */
    error: PropTypes.string,
};

/**
 * Renders a color picker input element.
 */
export const ColorPicker = forwardRef(({ label, onChange, name, value = "#ff0000" }, ref) => (
    <div className={styles.colorpicker}>
        <input type="color" onChange={onChange} name={name} value={value} ref={ref} />
        <span className={styles.label}>{label}</span>
    </div>
));

ColorPicker.propTypes = {
    /**
     * The label text for the input element.
     */
    label: PropTypes.string.isRequired,
    /**
     * Callback fired when the input value changes.
     */
    onChange: PropTypes.func.isRequired,
    /**
     * The name attribute of the input element.
     */
    name: PropTypes.string.isRequired,
    /**
     * The value of the input element.
     */
    value: PropTypes.string.isRequired,
};

/**
 * Renders a textarea input element.
 */
export const Textarea = forwardRef(({ label, rows = 5, onChange, onBlur, name, value, error = "" }, ref) => (
    <div className={`${styles.textfield} ${!value ? styles.empty : ""}`}>
        <textarea rows={rows} onChange={onChange} onBlur={onBlur} name={name} value={value} ref={ref}></textarea>
        <span className={styles.label}>{label}</span>
        { error && <span className={styles.error}>{error}</span> }
    </div>
));

Textarea.propTypes = {
    /**
     * The label text for the input element.
     */
    label: PropTypes.string.isRequired,
    /**
     * The number of rows for the textarea.
     */
    rows: PropTypes.number,
    /**
     * Callback fired when the input value changes.
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Callback fired when the input loses focus.
     */
    onBlur: PropTypes.func,
    /**
     * The name attribute of the input element.
     */
    name: PropTypes.string.isRequired,
    /**
     * The value of the input element.
     */
    value: PropTypes.string.isRequired,
    /**
     * The error message to be displayed.
     */
    error: PropTypes.string,
};

/**
 * Renders a select input element.
 */
export const Select = forwardRef(({ label, options = [], onChange, name, value, error = "" }, ref) => (
    <div className={`${styles.textfield} ${(value === "") ? styles.empty : ""}`}>
        <select onChange={onChange} name={name} value={value} ref={ref}>
            <option value=""></option>
            { options.map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
            ))}
        </select>
        <span className={styles.label}>{label}</span>
        { error && <span className={styles.error}>{error}</span> }
    </div>
));

Select.propTypes = {
    /**
     * The label text for the input element.
     */
    label: PropTypes.string.isRequired,
    /**
     * An array of options for the select element in the format of [[key, value],...].
     */
    options: PropTypes.array,
    /**
     * Callback fired when the input value changes.
     */
    onChange: PropTypes.func.isRequired,
    /**
     * The name attribute of the input element.
     */
    name: PropTypes.string.isRequired,
    /**
     * The value of the input element.
     */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    /**
     * The error message to be displayed.
     */
    error: PropTypes.string,
};