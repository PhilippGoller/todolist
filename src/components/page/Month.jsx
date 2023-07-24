import { useState, useMemo } from "react";
import { Page, Master, Detail } from "./Page";
import { IconButton } from "../input/Button";
import Icon from "../input/Icon";
import PageHeader from "./PageHeader";
import TaskList from "../task/TaskList";
import TaskForm from "../form/TaskForm";
import { useSelector } from "react-redux";
import { getTasksByDate } from "../../redux/selector/taskSelector";
import { useTaskForm } from "../../hooks/useTaskForm";
import { toLocaleISOString, toLocaleWeekdayDayMonthString, toMonthStart, toMonthEnd, toFullMonthName } from "../../services/formatDate";
import { bucketsort } from "../../services/bucketsort";

/**
 * A component that renders all tasks for a specified month.
 */
const Month = () => {
    const { selectedTask, handleEditTask, handleCheckTask, handleDeleteTask, handleSaveTask, handleCancelTask } = useTaskForm();
    const [date, setDate] = useState(new Date());
    const firstOfMonth = useMemo(() => toMonthStart(date), [date]);
    const lastOfMonth = useMemo(() => toMonthEnd(date), [date]);
    const fullMonthName = useMemo(() => toFullMonthName(date), [date]);
    const tasks = useSelector(state => getTasksByDate(state, toLocaleISOString(firstOfMonth), toLocaleISOString(lastOfMonth)));
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

    const handlePreviousMonth = () => {
        setDate(currentDate => {
            const nextDate = new Date(currentDate);
            nextDate.setMonth(currentDate.getMonth() - 1);
            return nextDate;
        });
    };

    const handleNextMonth = () => {
        setDate(currentDate => {
            const nextDate = new Date(currentDate);
            nextDate.setMonth(currentDate.getMonth() + 1);
            return nextDate;
        });
    };
    
    return (
        <Page>
            <Master>
                <PageHeader title={`${fullMonthName} ${date.getFullYear()}`} showToolbar={true} style={{paddingTop: "2.0625rem"}}>
                    <IconButton onClick={handlePreviousMonth} 
                        icon={<Icon type={Icon.type.ARROW_LEFT} size={Icon.size.MEDIUM} color={Icon.color.BLACK}/>}/>
                    <IconButton onClick={handleNextMonth} 
                        icon={<Icon type={Icon.type.ARROW_RIGHT} size={Icon.size.MEDIUM} color={Icon.color.BLACK}/>}/>
                </PageHeader>
                { mapTasksToTaskList() }
            </Master>
            <Detail show={selectedTask ? true : false} onClose={handleCancelTask}>
                <TaskForm task={selectedTask} onSubmit={handleSaveTask} onCancel={handleCancelTask}/>
            </Detail>
        </Page>
    );
};

export default Month;