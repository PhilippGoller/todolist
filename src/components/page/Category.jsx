import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Page, Master, Detail } from "./Page";
import PageHeader from "./PageHeader";
import TaskList from "../task/TaskList";
import TaskForm from "../form/TaskForm";
import { useSelector } from "react-redux";
import { getTasksByCategory } from "../../redux/selector/taskSelector";
import { getCategoryById } from "../../redux/selector/categorySelector";
import { useTaskForm } from "../../hooks/useTaskForm";
import { toLocaleWeekdayDayMonthString } from "../../services/formatDate";
import { bucketsort } from "../../services/bucketsort";

/**
 * A component that renders all tasks specified by the category id of the route.
 */
const Category = () => {
    const { selectedTask, handleEditTask, handleCheckTask, handleDeleteTask, handleSaveTask, handleCancelTask } = useTaskForm();
    const { category_id: id } = useParams();
    const tasks = useSelector(state => getTasksByCategory(state, parseInt(id)));
    const category = useSelector(state => getCategoryById(state, parseInt(id)));
    
    const map = useMemo(() => bucketsort(tasks, "date"), [tasks]);

    const mapTasksToTaskList = () => {
        const taskLists = [];

        for(let key in map) {
            taskLists.push( 
                <TaskList key={key} tasks={map[key]} header={toLocaleWeekdayDayMonthString(new Date(key))} selectedTask={selectedTask} 
                    onEdit={handleEditTask} onCheck={handleCheckTask} onDelete={handleDeleteTask} />
            );
        }

        return taskLists;
    };
    
    return (
        <Page>
            <Master>
                <PageHeader title={category?.name ?? "Keine Ergebnisse"} />
                { mapTasksToTaskList() }
            </Master>
            <Detail show={selectedTask ? true : false} onClose={handleCancelTask}>
                <TaskForm task={selectedTask} onSubmit={handleSaveTask} onCancel={handleCancelTask}/>
            </Detail>
        </Page>
    );
};

export default Category;