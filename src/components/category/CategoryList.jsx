import { useState, memo } from "react";
import Modal from "../modal/Modal";
import CategoryForm from "../form/CategoryForm";
import Icon from "../input/Icon";
import { IconButton, ToggleButton } from "../input/Button";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCategories } from "../../redux/selector/categorySelector";
import { useCategoryForm } from "../../hooks/useCategoryForm";
import PropTypes from "prop-types";
import styles from "./CategoryList.module.css";

/**
 * Renders the header of the category list.
 */
const CategoryHeader = ({ onToggle, onAdd }) => (
    <div className={styles.categoryHeader}>
        <div className={styles.wrapper}>
            <ToggleButton onClick={onToggle}
                icon={<Icon type={Icon.type.ARROW_DOWN} size={Icon.size.MEDIUM} color={Icon.color.BLACK}/>} />
            <span>Kategorien</span> 
        </div>
        <IconButton onClick={onAdd} 
            icon={<Icon type={Icon.type.ADD} size={Icon.size.MEDIUM} color={Icon.color.BLACK}/>}/>
    </div>
);

CategoryHeader.propTypes = {
    /**
     * Callback fired when the user clicks on the toggle button.
     */
    onToggle: PropTypes.func.isRequired,
    /**
     * Callback fired when the user clicks on the add button.
     */
    onAdd: PropTypes.func.isRequired,
};

/**
 * Renders a single category.
 */
const Category = memo(({ category, onEdit, onDelete }) => {

    const handleEditCategory = event => {
        onEdit(category);
        event.preventDefault();
    };

    const handleDeleteCategory = event => {
        onDelete(category);
        event.preventDefault();
    };

    return (
        <li>
            <NavLink to={`/category/${category.id}`} className={({ isActive }) => isActive ? `${styles.category} ${styles.active}` : styles.category}>
                <div className={styles.title}>
                    <span style={{backgroundColor: category.color ?? "#fefefe"}}></span>
                    <span>{category.name ?? ""}</span>
                </div>
                <div className={styles.buttons}>
                    <IconButton onClick={handleEditCategory} 
                        icon={<Icon type={Icon.type.EDIT} size={Icon.size.MEDIUM} color={Icon.color.BLACK}/>} />
                    <IconButton onClick={handleDeleteCategory} 
                        icon={<Icon type={Icon.type.DELETE} size={Icon.size.MEDIUM} color={Icon.color.BLACK}/>} />
                </div>
            </NavLink>
        </li>
    );
});

Category.propTypes = {
    /**
     * The category object to render.
     */
    category: PropTypes.shape({
        /**
         * The unique id of the category.
         */
        id: PropTypes.number.isRequired,
        /**
         * The name of the category.
         */
        name: PropTypes.string,
        /**
         * The color associated with the category.
         */
        color: PropTypes.string,
    }).isRequired,
    /**
     * Callback fired when the user clicks on the edit button.
     */
    onEdit: PropTypes.func.isRequired,
    /**
     * Callback fired when the user clicks on the delete button.
     */
    onDelete: PropTypes.func.isRequired,
};

/**
 * Renders a list of categories.
 */
const CategoryList = () => {
    const { selectedCategory, handleAddCategory, handleEditCategory, handleDeleteCategory, handleSaveCategory, handleCancelCategory} = useCategoryForm();
    const [showCategories, setShowCategories] = useState(true);
    const categories = useSelector(getCategories);
    
    const handleToggleCategories = () => setShowCategories(previousState => !previousState);

    return (
        <div className={styles.categories}>
            <CategoryHeader onToggle={handleToggleCategories} onAdd={handleAddCategory} />
            <ul className={showCategories ? styles.show : ""}>
                {categories.map(category => (
                    <Category key={category.id} category={category} onEdit={handleEditCategory} onDelete={handleDeleteCategory} />
                ))}
            </ul>
            <Modal show={selectedCategory ? true : false} onClose={handleCancelCategory}>
                <CategoryForm category={selectedCategory} onSubmit={handleSaveCategory} onCancel={handleCancelCategory} />
            </Modal>
        </div>
    );
};

export default CategoryList;