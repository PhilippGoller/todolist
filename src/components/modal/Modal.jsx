import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import Icon from "../input/Icon";
import { IconButton } from "../input/Button";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

/**
 * Renders a modal.
 */
const Modal = ({ show = false, onClose, children}) => {
    const modal = useRef();
    const root = document.getElementById("modal");

    useEffect(() => {
        if(!show) {
            return;
        }

        if(root.children.length > 1) {
            onClose();
            return;
        }

        const handleWindowClick = event => {
            if(event.target === modal.current) {
                onClose();
            }
        };

        window.addEventListener("click", handleWindowClick);
        return () => window.removeEventListener("click", handleWindowClick);

    }, [show]);

    if(!show) {
        return "";
    }

    return createPortal(
        <div ref={modal} className={show ? `${styles.modal} ${styles.show}` : styles.modal}>
            <div className={styles["modal-box"]}>
                <div className={styles["modal-toolbar"]}>
                    <IconButton onClick={onClose} 
                        icon={<Icon type={Icon.type.ARROW_BACKWARD} size={Icon.size.MEDIUM} color={Icon.color.BLACK}/>} />
                    <IconButton onClick={onClose} 
                        icon={<Icon type={Icon.type.CLOSE} size={Icon.size.MEDIUM} color={Icon.color.BLACK}/>} />
                </div>
                <div className={styles["modal-content"]}>
                    {children}
                </div>
            </div>
        </div>,
        root
    );
};

Modal.propTypes = {
    /**
     * A boolean indicating if the modal should be displayed.
     */
    show: PropTypes.bool,
    /**
     * Callback fired when the modal is closed.
     */
    onClose: PropTypes.func.isRequired,
    /**
     * The components to be rendered inside the modal.
     */
    children: PropTypes.node.isRequired,
};

export default Modal;