import { ChangeEvent, useState, KeyboardEvent } from "react";
import styles from "./AddItemForm.module.scss";

type AddItemFormProps = {
    addItem: (title: string) => void;
};

export const AddItemForm: React.FC<AddItemFormProps> = ({ addItem }) => {
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
        addItem(inputValue.trim());
        setInputValue("");
    };

    return (
        <>
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
        </>
    );
};
