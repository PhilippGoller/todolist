import { useLayoutEffect } from "react";
import { Button, SubmitButton } from "../input/Button";
import { Input, Select, Textarea } from "../input/Input";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { getCategories } from "../../redux/selector/categorySelector";
import { toLocaleISOString } from "../../services/formatDate";
import PropTypes from "prop-types";
import styles from "./TaskForm.module.css";

/**
 * Renders a form to add or edit a task.
 */
const TaskForm = ({ task, onSubmit, onCancel }) => {
    const { 
        control, 
        handleSubmit,
        setValue,
        reset,
        formState : { errors } 
    } = useForm({
        defaultValues: {
            done: task?.done ?? false,
            title: task?.title ?? "",
            date: task?.date ?? toLocaleISOString(new Date()),
            category: task?.category ?? "",
            description: task?.description ?? "",
            id: task?.id ?? "",
        }
    });

    const categories = useSelector(getCategories);

    useLayoutEffect(() => {
        reset({
            done: task?.done ?? false,
            title: task?.title ?? "",
            date: task?.date ?? toLocaleISOString(new Date()),
            category: task?.category ?? "",
            description: task?.description ?? "",
            id: task?.id ?? "",
        });
    }, [task]);

    const handleBlur = (event) => {
        const { name, value } = event.target;
        setValue(name, value.trim(), { shouldValidate: true });
    }

    return (
        <form className={styles.task} onSubmit={handleSubmit(onSubmit)}>
            <Controller 
                name="title" 
                control={control}
                rules={{
                    required: "Bitte einen Titel für die Aufgabe eingeben.",
                    minLength: {
                        value: 1,
                        message: "Der Titel muss zwischen 1 und 30 Zeichen lang sein.",
                    },
                    maxLength: {
                        value: 30,
                        message: "Der Titel muss zwischen 1 und 30 Zeichen lang sein.",
                    }
                }}
                render={({ field: { value, onChange } }) => (
                    <Input label="Titel" name="title" value={value} onChange={onChange} onBlur={handleBlur} error={errors.title?.message} />
                )}
            />
            <Controller 
                name="date" 
                control={control}
                rules={{
                    required: "Bitte ein Datum für die Aufgabe festlegen.",
                    pattern: {
                        value: /^[\d]{4}-[\d]{2}-[\d]{2}$/,
                        message: "Bitte ein Datum im Format YYYY-MM-DD eingeben."
                    }
                }}
                render={({ field: { value, onChange } }) => (
                    <Input label="Datum" type="date" name="date" value={value} onChange={onChange} error={errors.date?.message} />
                )}
            />
            <Controller 
                name="category" 
                control={control}
                render={({ field: { value, onChange } }) => (
                    <Select label="Kategorie (optional)" name="category" value={value} onChange={onChange} options={categories.map(category => [category.id, category.name])} />
                )}
            />
            <Controller 
                name="description" 
                control={control}
                rules={{
                    maxLength: {
                        value: 250,
                        message: "Die Beschreibung darf maximal 250 Zeichen lang sein.",
                    }
                }}
                render={({ field: { value, onChange } }) => (
                    <Textarea label="Beschreibung (optional)" name="description" value={value} onChange={onChange} onBlur={handleBlur} error={errors.description?.message} />
                )}
            />
            <div className={styles.buttons}>
                <SubmitButton>Speichern</SubmitButton>
                <Button onClick={onCancel}>Abbrechen</Button>
            </div>
        </form>
    );
};

TaskForm.propTypes = {
    /**
     * The task object to render.
     */
    task: PropTypes.shape({
        /**
         * The unique id of the task.
         */
        id: PropTypes.number,
        /**
         * The title of the task.
         */
        title: PropTypes.string,
        /**
         * The date of the task in the format YYYY-MM-DD.
         */
        date: PropTypes.string,
        /**
         * The id of the category associated with the task.
         */
        category: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * The description of the task.
         */
        description: PropTypes.string,
        /**
         * Whether the task is completed or not.
         */
        done: PropTypes.bool,
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

export default TaskForm;