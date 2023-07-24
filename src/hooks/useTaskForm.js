import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as thunk from "../redux/thunks/taskThunks";

/**
 * A task object.
 * @typedef {Object} Task
 * @property {boolean} done - Represents if the task is finished or unfinished.
 * @property {string} title - The title of the task.
 * @property {string} date - The date string of the task in the format YYYY-MM-DD.
 * @property {(number|string)} category - The id of the associated category of the task.
 * @property {string} description - The description of the task.
 * @property {(number|string)} id - The unique id of the task.
 */

/**
 * @typedef {Object} TaskFormMethods
 * @property {Object} selectedTask - Represents the task to be displayed by the TaskForm.
 * @property {Function} setSelectedTask - Sets the currently selected task manually.
 * @property {Function} handleAddTask - Handles adding a new task by setting selectedTask to a new object.
 * @property {Function} handleCheckTask - Handles checking or unchecking a task and saves the changes.
 * @property {Function} handleEditTask - Handles editing a task by setting selectedTask to be the passed task.
 * @property {Function} handleCancelTask - Handles cancelling task editing or creation by setting selectedTask to null.
 * @property {Function} handleSaveTask - Handles saving changes made to a task. If the task doesn't exist yet a new task is created.
 * @property {Function} handleDeleteTask - Handles deleting a task.
 */

/**
 * A custom Hook which returns methods to deal with the TaskForm component.
 * @returns {TaskFormMethods} Various methods to deal with the TaskForm component.
 *      The property selectedTask represents the task to be displayed by the TaskForm.
 */
export const useTaskForm = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const dispatch = useDispatch();

    /**
     * Handles adding a new task by setting selectedTask to a new object.
     */
    const handleAddTask = useCallback(() => setSelectedTask({}), []);

    /**
     * Handles checking or unchecking a task and saves the changes.
     * @param {Object} task - The task to be checked or unchecked.
     */
    const handleCheckTask = useCallback(task => dispatch(thunk.editTask({ ...task, done: !task.done })), []);

    /**
     * Handles editing a task by setting selectedTask to be the passed task.
     * @param {Object} task - The task to be edited.
     */
    const handleEditTask = useCallback(task => setSelectedTask(task), []);

    /**
     * Handles cancelling task editing or creation by setting selectedTask to null.
     */
    const handleCancelTask = useCallback(() => setSelectedTask(null), []);

    /**
     * Handles saving changes made to a task. If the task doesn't exist yet a new task is created.
     * @param {Object} task - The task to be saved.
     */
    const handleSaveTask = useCallback(task => {
        setSelectedTask(null);

        const categoryId = parseInt(task.category);
        task.category = Number.isNaN(categoryId) ? "" : categoryId;

        (task.id !== "") ? dispatch(thunk.editTask(task)) : dispatch(thunk.addTask(task));
    }, []);

    /**
     * Handles deleting a task.
     * @param {Object} task - The task to be deleted.
     * @param {boolean} isSelected - Whether or not the task is currently selected.
     */
    const handleDeleteTask = useCallback((task, isSelected) => {
        const shouldDelete = confirm("Wirklich löschen?");
        
        if(!shouldDelete) {
            return;
        }
        
        if(isSelected) {
            setSelectedTask(null);
        }

        dispatch(thunk.deleteTask(task.id));
    }, []);

    return { selectedTask, setSelectedTask, handleAddTask, handleCheckTask, 
        handleEditTask, handleCancelTask, handleSaveTask, handleDeleteTask };
};