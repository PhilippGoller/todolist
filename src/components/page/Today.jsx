import { useState } from "react";
import { Page, Master, Detail } from "./Page";
import PageHeader from "./PageHeader";
import TaskList from "../task/TaskList";
import TaskForm from "../form/TaskForm";
import { useSelector } from "react-redux";
import { getTasksByDate } from "../../redux/selector/taskSelector";
import { useTaskForm } from "../../hooks/useTaskForm";
import { toLocaleISOString, toLocaleWeekdayDayMonthString } from "../../services/formatDate";

/**
 * A component that renders all tasks for today.
 */
const Today = () => {
    const { selectedTask, handleEditTask, handleCheckTask, handleDeleteTask, handleSaveTask, handleCancelTask } = useTaskForm();
    const [ today ] = useState(new Date());
    const tasks = useSelector(state => getTasksByDate(state, toLocaleISOString(today)));

    return (
        <Page>
            <Master>
                <PageHeader title="Heute" />
                <TaskList tasks={tasks} header={toLocaleWeekdayDayMonthString(today)} selectedTask={selectedTask} 
                    onEdit={handleEditTask} onCheck={handleCheckTask} onDelete={handleDeleteTask} />
            </Master>
            <Detail show={selectedTask ? true : false} onClose={handleCancelTask}>
                <TaskForm task={selectedTask} onSubmit={handleSaveTask} onCancel={handleCancelTask}/>
            </Detail>
        </Page>
    );
};

export default Today;