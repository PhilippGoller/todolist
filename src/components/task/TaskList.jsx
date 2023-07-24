import { memo } from "react";
import Icon from "../input/Icon";
import Checkbox from "../input/Checkbox";
import { IconButton } from "../input/Button";
import PropTypes from "prop-types";
import styles from "./TaskList.module.css";

/**
 * Renders a single task.
 */
const Task = memo(({ task, isSelected, onEdit, onCheck, onDelete }) => {

    const handleEditTask = () => onEdit(task);

    const handleEditTaskKeyboard = event => {
        if(event.repeat) {
            return;
        }
        
        if(event.target.tagName !== "LI") {
            return;
        }

        if(event.key === " " || event.key === "Enter") {
            onEdit(task);
        }
    };

    const handleCheckTask = event => {
        onCheck(task);
        event.stopPropagation();
    };

    const handleDeleteTask = event => {
        onDelete(task, isSelected);
        event.stopPropagation();
    };
    
    return (
        <li tabIndex={0} onKeyDown={handleEditTaskKeyboard} onClick={handleEditTask} 
            className={isSelected ? `${styles.task} ${styles.selected}` : styles.task}>
            <div className={styles.description} >
                <Checkbox onChange={handleCheckTask} isChecked={task.done ?? false} />
                <span>{task.title ?? ""}</span>
            </div>
            <div className={styles.toolbar}>
                <IconButton onClick={handleDeleteTask} 
                    icon={<Icon type={Icon.type.DELETE} size={Icon.size.MEDIUM} color={Icon.color.BLACK}/>} />
            </div>
        </li>
    );
});

Task.propTypes = {
    /**
     * The task object to render.
     */
    task: PropTypes.shape({
        /**
         * The unique id of the task.
         */
        id: PropTypes.number.isRequired,
        /**
         * The title of the task.
         */
        title: PropTypes.string,
        /**
         * Whether the task is completed or not.
         */
        done: PropTypes.bool,
    }).isRequired,
    /**
     * A boolean indicating if the task is currently selected.
     */
    isSelected: PropTypes.bool.isRequired,
    /**
     * Callback fired when the user clicks on the task.
     */
    onEdit: PropTypes.func.isRequired,
    /**
     * Callback fired when the user checks or unchecks the checkbox.
     */
    onCheck: PropTypes.func.isRequired,
    /**
     * Callback fired when the user clicks on the delete button.
     */
    onDelete: PropTypes.func.isRequired,
};


/**
 * Renders a list of tasks.
 */
const TaskList = ({ header, tasks, selectedTask, onEdit, onCheck, onDelete }) => (
    <div className={styles.taskList}>
        { header && <h2>{header}</h2>}
        <ul>
            {
                tasks.map(task => (
                    <Task key={task.id} task={task} isSelected={task.id === selectedTask?.id} 
                        onEdit={onEdit} onCheck={onCheck} onDelete={onDelete} />
                ))
            }
        </ul>
    </div>
);

TaskList.propTypes = {
    /**
     * The title to display above the task list.
     */
    header: PropTypes.string,
    /**
     * An array of task objects.
     */
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            /**
             * The unique id of the task.
             */
            id: PropTypes.number.isRequired,
            /**
             * The title of the task.
             */
            title: PropTypes.string,
            /**
             * Whether the task is completed or not.
             */
            done: PropTypes.bool,
        })
    ).isRequired,
    /**
     * The currently selected task.
     */
    selectedTask: PropTypes.shape({
        /**
         * The unique id of the task.
         */
        id: PropTypes.number,
    }),
    /**
     * Callback fired when the user clicks on a task.
     */
    onEdit: PropTypes.func.isRequired,
    /**
     * Callback fired when the user checks or unchecks a checkbox.
     */
    onCheck: PropTypes.func.isRequired,
    /**
     * Callback fired when the user clicks on a delete button.
     */
    onDelete: PropTypes.func.isRequired,
};

export default TaskList;