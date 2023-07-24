import { useState, useRef } from "react";
import { IconButton, SubmitButton } from "./Button";
import Icon from "./Icon";
import PropTypes from "prop-types";
import styles from "./Searchbar.module.css";

/**
 * Renders a custom searchbar.
 */
const Searchbar = ({ onSearch }) => {
    const [searchtext, setSearchtext] = useState("");
    const [hasFocus, setHasFocus] = useState(false);
    const input = useRef();
    
    const handleChange = (event) => setSearchtext(event.target.value);
    const handleFocus = () => setHasFocus(true);
    const handleBlur = () => setHasFocus(false);
    const handleSearch = () => onSearch(searchtext.trim().toLowerCase());

    const handleDelete = () => {
        setSearchtext("");
        input.current.focus();
    };

    return (
        <div className={styles.searchbar} >
            <div className={`${styles.wrapper} ${hasFocus ? styles.focus : ""}`}>
                <input type="text" placeholder="Suchen..." value={searchtext} ref={input}
                    onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>
                <IconButton onClick={handleDelete} 
                    icon={<Icon type={Icon.type.CLOSE} size={Icon.size.SMALL} color={Icon.color.GREY}/>}/>
            </div>
            <SubmitButton onClick={handleSearch}>
                <Icon type={Icon.type.SEARCH} size={Icon.size.SMALL} color={Icon.color.WHITE}/>
            </SubmitButton>
        </div>
    );
};

Searchbar.propTypes = {
    /**
     * Callback fired when the user clicks on the search button 
     * passing the searchtext to the function.
     */
    onSearch: PropTypes.func.isRequired,
};

export default Searchbar;