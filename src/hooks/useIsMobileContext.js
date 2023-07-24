import { useContext } from "react";
import { IsMobileContext } from "../context/IsMobileContext";

/**
 * Represents if the app is currently displayed on a mobile device or another small screen.
 * @returns {boolean} True if on a mobile device or another small screen otherwise false.
 */
export const useIsMobileContext = () => useContext(IsMobileContext);