import PropTypes from "prop-types";
import styles from "./PageHeader.module.css";

/**
 * Renders a page header with a title and an optional toolbar.
 */
const PageHeader = ({ title, showToolbar = false, children, style = {} }) => (
    <header className={styles["page-header"]} style={style}>
        <h1>{title}</h1>
        { showToolbar && <div className={styles.toolbar}>{children}</div> }
    </header>
);

PageHeader.propTypes = {
    /**
     * The main title for the page header.
     */
    title: PropTypes.string.isRequired,
    /**
     * Whether or not to display the toolbar.
     */
    showToolbar: PropTypes.bool,
    /**
     * Child elements to be displayed within the optional toolbar (should be icon buttons).
     */
    children: PropTypes.node,
    /**
     * Additional styles to be applied to the page header component.
     */
    style: PropTypes.object,
};

export default PageHeader;