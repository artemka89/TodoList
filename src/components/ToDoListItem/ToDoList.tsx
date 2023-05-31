import { ChangeEvent, KeyboardEvent, useState } from "react";
import { TaskItem } from "../Task/TaskItem";
import styles from "./ToDoList.module.scss";
import { FilterValuesType, TaskItemType } from "../../App";
import { TaskFilter } from "../TaskFilter/TaskFilter";

type ToDoListItemProps = {
    id: string;
    title: string;
    tasks: TaskItemType[];
    addTaskItem: (value: string, todoListId: string) => void;
    removeTaskItem: (taskId: string, todoListId: string) => void;
    changeFilter: (value: FilterValuesType, id: string) => void;
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
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
    filter,
}) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setError("");
    };

    const onClickEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === "Enter" && addTask();
    };

    const addTask = () => {
        if (inputValue.trim() === "") {
            setError("Поле обязательное!");
            return;
        }
        addTaskItem(inputValue.trim(), id);
        setInputValue("");
    };

    const onClickDelBtn = () => {
        removeTodoList(id);
    };

    return (
        <div className={styles.toDoListItem}>
            <div className={styles.toDoListHeader}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.delBtn}>
                    <button onClick={onClickDelBtn}>x</button>
                </div>
            </div>

            <div className={styles.addNewTask}>
                <input
                    className={error ? styles.error : ""}
                    value={inputValue}
                    onChange={onChangeHandler}
                    onKeyDown={onClickEnter}
                    type="text"
                    placeholder=""
                />
                <div className={styles.addBtn}>
                    <button onClick={addTask}>+</button>
                </div>
            </div>
            {error && (
                <div className={styles.errorMessage}>Поле обязательно</div>
            )}
            <ul className={styles.tasks}>
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        todoListId={id}
                        task={task}
                        removeTaskItem={removeTaskItem}
                        changeStatus={changeStatus}
                    />
                ))}
            </ul>
            <TaskFilter id={id} changeFilter={changeFilter} filter={filter} />
        </div>
    );
};
