import { ToolbarButton } from "../input/Button";
import Icon from "../input/Icon";
import Searchbar from "../input/Searchbar";
import Modal from "../modal/Modal";
import TaskForm from "../form/TaskForm";
import { useTaskForm } from "../../hooks/useTaskForm";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Titlebar.module.css";

/**
 * Renders the titlebar with a hamburger button, searchbar and an add button.
 */
const Titlebar = ({ onToggle }) => {
    const { selectedTask, handleAddTask, handleSaveTask, handleCancelTask } = useTaskForm();
    const navigate = useNavigate();

    const handleSearch = searchtext => searchtext && navigate(`/search/${searchtext}`);

    return (
        <header className={styles.titlebar}>
            <ToolbarButton onClick={onToggle} icon={<Icon type={Icon.type.HAMBURGER} size={Icon.size.MEDIUM} color={Icon.color.WHITE}/>} />
            <Searchbar onSearch={handleSearch} />
            <ToolbarButton onClick={handleAddTask} icon={<Icon type={Icon.type.ADD} size={Icon.size.MEDIUM} color={Icon.color.WHITE}/>} />
            <Modal show={selectedTask ? true : false} onClose={handleCancelTask}>
                <TaskForm onSubmit={handleSaveTask} onCancel={handleCancelTask} />
            </Modal>
        </header>
    );
};

Titlebar.propTypes = {
    /**
     * Callback fired when the user clicks on the hamburger button.
     */
    onToggle: PropTypes.func.isRequired,
};

export default Titlebar;