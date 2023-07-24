import { useLayoutEffect } from "react";
import { Button, SubmitButton } from "../input/Button";
import { Input, ColorPicker } from "../input/Input";
import { useForm, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import styles from "./CategoryForm.module.css";

/**
 * Renders a form to add or edit categories.
 */
const CategoryForm = ({ category, onSubmit, onCancel }) => {
    const { 
        control, 
        handleSubmit,
        setValue,
        reset,
        formState : { errors } 
    } = useForm({
        defaultValues: {
            name: category?.name ?? "",
            color: category?.color ?? "#ff0000",
            id: category?.id ?? "",
        }
    });

    useLayoutEffect(() => {
        reset({
            name: category?.name ?? "",
            color: category?.color ?? "#ff0000",
            id: category?.id ?? "",
        });
    }, [category]);

    const handleBlur = (event) => {
        const { name, value } = event.target;
        setValue(name, value.trim(), { shouldValidate: true });
    }

    return (
        <form className={styles.category} onSubmit={handleSubmit(onSubmit)}>
            <Controller 
                name="name" 
                control={control}
                rules={{
                    required: "Bitte einen Namen für die Kategorie eingeben.",
                    minLength: {
                        value: 3,
                        message: "Der Name muss zwischen 3 und 15 Zeichen lang sein.",
                    },
                    maxLength: {
                        value: 15,
                        message: "Der Name muss zwischen 3 und 15 Zeichen lang sein.",
                    }
                }}
                render={({ field: { value, onChange } }) => (
                    <Input label="Kategorie" name="name" value={value} onChange={onChange} onBlur={handleBlur} error={errors.name?.message} />
                )}
            />
            <Controller 
                name="color" 
                control={control}
                render={({ field: { value, onChange } }) => (
                    <ColorPicker label="Farbe" name="color" value={value} onChange={onChange} />
                )}
            />
            <div className={styles.buttons}>
                <SubmitButton>Speichern</SubmitButton>
                <Button onClick={onCancel}>Abbrechen</Button>
            </div>
        </form>
    );
};

CategoryForm.propTypes = {
    /**
     * The category object to render.
     */
    category: PropTypes.shape({
        /**
         * The unique id of the category.
         */
        id: PropTypes.number,
        /**
         * The name of the category.
         */
        name: PropTypes.string,
        /**
         * The color associated with the category.
         */
        color: PropTypes.string,
    }),
    /**
     * Callback fired when the user clicks on the submit button.
     */
    onSubmit: PropTypes.func.isRequired,
    /**
     * Callback fired when the user clicks on the cancel button.
     */
    onCancel: PropTypes.func.isRequired,
};

export default CategoryForm;