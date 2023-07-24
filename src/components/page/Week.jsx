import { useState, useMemo } from "react";
import { Page, Master, Detail } from "./Page";
import PageHeader from "./PageHeader";
import TaskList from "../task/TaskList";
import TaskForm from "../form/TaskForm";
import { useSelector } from "react-redux";
import { getTasksByDate } from "../../redux/selector/taskSelector";
import { useTaskForm } from "../../hooks/useTaskForm";
import { toLocaleISOString, toLocaleWeekdayDayMonthString, toWeekStart, toWeekEnd, toWeekOfYear } from "../../services/formatDate";
import { bucketsort } from "../../services/bucketsort";

/**
 * A component that renders all tasks for the current week.
 */
const Week = () => {
    const { selectedTask, handleEditTask, handleCheckTask, handleDeleteTask, handleSaveTask, handleCancelTask } = useTaskForm();
    const [ today ] = useState(new Date());
    const monday = useMemo(() => toWeekStart(today), [today]);
    const sunday = useMemo(() => toWeekEnd(today), [today]);
    const week = useMemo(() => toWeekOfYear(today), [today]);
    const tasks = useSelector(state => getTasksByDate(state, toLocaleISOString(monday), toLocaleISOString(sunday)));
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
                <PageHeader title={`Diese Woche (KW${week})`} />
                { mapTasksToTaskList() }
            </Master>
            <Detail show={selectedTask ? true : false} onClose={handleCancelTask}>
                <TaskForm task={selectedTask} onSubmit={handleSaveTask} onCancel={handleCancelTask}/>
            </Detail>
        </Page>
    );
};

export default Week;