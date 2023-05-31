import { ChangeEvent } from "react";
import { TaskItemType } from "../../App";
import styles from "./TaskItem.module.scss";

type TaskItemProps = {
    todoListId: string
    task: TaskItemType;
    removeTaskItem: (taskId: string, todoListId: string) => void;
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
};

export const TaskItem: React.FC<TaskItemProps> = ({
    todoListId,
    task,
    removeTaskItem,
    changeStatus,
}) => {
    const deleteTask = () => {
        removeTaskItem(task.id, todoListId);
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeStatus(task.id, event.target.checked, todoListId);
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
            <p className={styles.taskName}>{task.name}</p>
            <div className={styles.delBtn}>
                <button onClick={deleteTask}>X</button>
            </div>
        </li>
    );
};
