import { FilterValuesType } from "../../App";
import styles from "./TaskFilter.module.scss";

type TaskFilterType = {
    id: string;
    changeFilter: (value: FilterValuesType, id: string) => void;
    filter: FilterValuesType;
};

export const TaskFilter: React.FC<TaskFilterType> = ({
    changeFilter,
    filter,
    id,
}) => {
    return (
        <div className={styles.taskFilter}>
            <button
                className={filter === "all" ? styles.active : ""}
                onClick={() => changeFilter("all", id)}
            >
                All
            </button>
            <button
                className={filter === "active" ? styles.active : ""}
                onClick={() => changeFilter("active", id)}
            >
                Active
            </button>
            <button
                className={filter === "complited" ? styles.active : ""}
                onClick={() => changeFilter("complited", id)}
            >
                Complited
            </button>
        </div>
    );
};
