import { TaskItem } from "../Task/TaskItem";
import styles from "./TodoList.module.scss";
import { FilterValuesType, TaskItemType } from "../../App";
import { TaskFilter } from "../TaskFilter/TaskFilter";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";

type ToDoListItemProps = {
    id: string;
    title: string;
    tasks: TaskItemType[];
    addTaskItem: (value: string, todoListId: string) => void;
    removeTaskItem: (taskId: string, todoListId: string) => void;
    changeFilter: (value: FilterValuesType, id: string) => void;
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
    changeTaskTitle: (
        taskId: string,
        newTitle: string,
        todoListId: string
    ) => void;
    onChangeTodoListTitle: (todoListId: string, newTitle: string) => void;
    removeTodoList: (todoListId: string) => void;
    filter: FilterValuesType;
};

export const ToDoList: React.FC<ToDoListItemProps> = ({
    id,
    tasks,
    title,
    addTaskItem,
    removeTaskItem,
    changeFilter,
    changeStatus,
    removeTodoList,
    changeTaskTitle,
    onChangeTodoListTitle,
    filter,
}) => {
    const addTask = (taskTitle: string) => {
        addTaskItem(taskTitle, id);
    };

    const onClickDelBtn = () => {
        removeTodoList(id);
    };

    const changeTodolistTitle = (newTitle: string) => {
        onChangeTodoListTitle(id, newTitle);
    };

    return (
        <div className={styles.toDoListItem}>
            <div className={styles.toDoListHeader}>
                <h2 className={styles.title}>
                    <EditableSpan title={title} onChangeTitle={changeTodolistTitle} />
                </h2>
                <div className={styles.delBtn}>
                    <button onClick={onClickDelBtn}>x</button>
                </div>
            </div>

            <AddItemForm addItem={addTask} />
            <ul className={styles.tasks}>
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        todoListId={id}
                        task={task}
                        removeTaskItem={removeTaskItem}
                        changeStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                    />
                ))}
            </ul>
            <TaskFilter id={id} changeFilter={changeFilter} filter={filter} />
        </div>
    );
};
