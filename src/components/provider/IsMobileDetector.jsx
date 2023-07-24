import { useState, useLayoutEffect } from "react";
import { IsMobileContext } from "../../context/IsMobileContext";
import PropTypes from "prop-types";

/**
 * Wrapps its children components with the IsMobileContext. 
 * Adds an eventlistener to check the window size determining if the app is
 * displayed on a mobile divice or another small screen. Updates the context value
 * isMobile accordingly.
 */
const IsMobileDetector = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    useLayoutEffect(() => {
        const handleResize = event => {
            if(event.matches) {
                setIsMobile(false);
                return;
            }
            
            setIsMobile(true);
        };

        const mediaQuery = window.matchMedia("(min-width: 992px)");
        handleResize(mediaQuery);
        
        mediaQuery.addEventListener("change", handleResize);

        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };

    }, []);

    return (
        <IsMobileContext.Provider value={isMobile}>
            {children}
        </IsMobileContext.Provider>
    );
};

IsMobileDetector.propTypes = {
    /**
     * The children components to wrap with the IsMobileContext.
     */
    children: PropTypes.element.isRequired,
};
  

export default IsMobileDetector;