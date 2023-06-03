import { ChangeEvent } from "react";
import { TaskItemType } from "../../App";
import styles from "./TaskItem.module.scss";
import { EditableSpan } from "../EditableSpan/EditableSpan";

type TaskItemProps = {
    todoListId: string;
    task: TaskItemType;
    removeTaskItem: (taskId: string, todoListId: string) => void;
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
    changeTaskTitle: (
        taskId: string,
        newTitle: string,
        todoListId: string
    ) => void;
};

export const TaskItem: React.FC<TaskItemProps> = ({
    todoListId,
    task,
    removeTaskItem,
    changeStatus,
    changeTaskTitle,
}) => {
    const deleteTask = () => {
        removeTaskItem(task.id, todoListId);
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeStatus(task.id, event.target.checked, todoListId);
    };

    const onChangeTitleHandler = (newTitle: string) => {
        changeTaskTitle(task.id, newTitle, todoListId);
    };

    return (
        <li
            className={
                task.isDone ? `${styles.task} ${styles.isDone}` : styles.task
            }
        >
            <input
                type="checkbox"
                checked={task.isDone}
                onChange={onChangeHandler}
            />
            <EditableSpan
                title={task.name}
                onChangeTitle={onChangeTitleHandler}
            />
            <div className={styles.delBtn}>
                <button onClick={deleteTask}>X</button>
            </div>
        </li>
    );
};
