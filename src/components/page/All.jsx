import { useMemo } from "react";
import { Page, Master, Detail } from "./Page";
import PageHeader from "./PageHeader";
import TaskList from "../task/TaskList";
import TaskForm from "../form/TaskForm";
import { useSelector } from "react-redux";
import { getTasks } from "../../redux/selector/taskSelector";
import { useTaskForm } from "../../hooks/useTaskForm";
import { toLocaleWeekdayDayMonthString } from "../../services/formatDate";
import { bucketsort } from "../../services/bucketsort";

/**
 * A component that renders all tasks.
 */
const All = () => {
    const { selectedTask, handleEditTask, handleCheckTask, handleDeleteTask, handleSaveTask, handleCancelTask } = useTaskForm();
    const tasks = useSelector(getTasks);
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
                <PageHeader title="Alle" />
                { mapTasksToTaskList() }
            </Master>
            <Detail show={selectedTask ? true : false} onClose={handleCancelTask}>
                <TaskForm task={selectedTask} onSubmit={handleSaveTask} onCancel={handleCancelTask}/>
            </Detail>
        </Page>
    );
};

export default All;