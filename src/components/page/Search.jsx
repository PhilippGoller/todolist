import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Page, Master, Detail } from "./Page";
import PageHeader from "./PageHeader";
import TaskList from "../task/TaskList";
import TaskForm from "../form/TaskForm";
import { useSelector } from "react-redux";
import { getTasksByTitle } from "../../redux/selector/taskSelector";
import { useTaskForm } from "../../hooks/useTaskForm";
import { toLocaleWeekdayDayMonthString } from "../../services/formatDate";
import { bucketsort } from "../../services/bucketsort";

/**
 * A component that renders all tasks specified by the searchtext parameter of the route.
 */
const Search = () => {
    const { selectedTask, handleEditTask, handleCheckTask, handleDeleteTask, handleSaveTask, handleCancelTask } = useTaskForm();
    const { search_text: searchtext } = useParams();
    const tasks = useSelector(state => getTasksByTitle(state, searchtext));
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
                <PageHeader title={(tasks.length === 1) ? `${tasks.length} Suchergebnis` : `${tasks.length} Suchergebnisse`} />
                { mapTasksToTaskList() }
            </Master>
            <Detail show={selectedTask ? true : false} onClose={handleCancelTask}>
                <TaskForm task={selectedTask} onSubmit={handleSaveTask} onCancel={handleCancelTask}/>
            </Detail>
        </Page>
    );
};

export default Search;