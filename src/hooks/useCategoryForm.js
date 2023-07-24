import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as thunk from "../redux/thunks/categoryThunks";

/**
 * A category object.
 * @typedef {Object} Category
 * @property {string} name - The name of the category.
 * @property {string} color - The color associated with the category.
 * @property {(number|string)} id - The unique id of the category.
 */

/**
 * @typedef {Object} CategoryFormMethods
 * @property {Object} selectedCategory - Represents the category to be displayed by the CategoryForm.
 * @property {Function} setSelectedCategory - Sets the currently selected category manually.
 * @property {Function} handleAddCategory - Handles adding a new category by setting selectedCategory to a new object.
 * @property {Function} handleEditCategory - Handles editing a category by setting selectedCategory to be the passed category.
 * @property {Function} handleCancelCategory - Handles cancelling category editing or creation by setting selectedCategory to null.
 * @property {Function} handleSaveCategory - Handles saving changes made to a category. If the category doesn't exist yet a new category is created.
 * @property {Function} handleDeleteCategory - Handles deleting a category.
 */

/**
 * A custom Hook which returns methods to deal with the CategoryForm component.
 * @returns {CategoryFormMethods} Various methods to deal with the CategoryForm component. 
 *      The property selectedCategory represents the category to be displayed by the CategoryForm.
 */
export const useCategoryForm = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const dispatch = useDispatch();

    /**
     * Handles adding a new category by setting selectedCategory to a new object.
     */
    const handleAddCategory = useCallback(() => setSelectedCategory({}), []);

    /**
     * Handles editing a category by setting selectedCategory to be the passed category.
     * @param {Object} category - The category to be edited.
     */
    const handleEditCategory = useCallback(category => setSelectedCategory(category), []);

    /**
     * Handles cancelling category editing or creation by setting selectedCategory to null.
     */
    const handleCancelCategory = useCallback(() => setSelectedCategory(null), []);

    /**
     * Handles saving changes made to a category. If the category doesn't exist yet a new category is created.
     * @param {Object} category - The category to be saved.
     */
    const handleSaveCategory = useCallback(category => {
        setSelectedCategory(null);
        (category.id !== "") ? dispatch(thunk.editCategory(category)) : dispatch(thunk.addCategory(category));
    }, []);

    /**
     * Handles deleting a category.
     * @param {Object} category - The category to be deleted.
     */
    const handleDeleteCategory = useCallback(category => {
        const shouldDelete = confirm("Wirklich löschen?");

        if(!shouldDelete) {
            return;
        }
        
        setSelectedCategory(null);
        dispatch(thunk.deleteCategoryWithTasks(category.id))
    }, []);

    return { selectedCategory, setSelectedCategory, handleAddCategory, handleEditCategory,
        handleCancelCategory, handleSaveCategory, handleDeleteCategory};
};



    

    

    

    