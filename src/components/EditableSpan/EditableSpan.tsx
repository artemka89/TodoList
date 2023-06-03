import { ChangeEvent, useState, KeyboardEvent } from "react";
import styles from "./EditableSpan.module.scss";

type EditableSpan = {
    title: string;
    onChangeTitle: (newTitle: string) => void;
};

export const EditableSpan: React.FC<EditableSpan> = ({
    title,
    onChangeTitle,
}) => {
    const [editableTitle, setEditableTitle] = useState("");

    const [editMode, setEditMode] = useState(false);

    const activateEditMode = () => {
        setEditMode(true);
        setEditableTitle(title);
    };

    const activateViewMode = () => {
        setEditMode(false);
        onChangeTitle(editableTitle);
    };

    const onClickEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === "Enter" && activateViewMode();
    };

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) =>
        setEditableTitle(event.target.value);

    return editMode ? (
        <input
            autoFocus
            onBlur={activateViewMode}
            onKeyDown={onClickEnterKey}
            type="text"
            value={editableTitle}
            onChange={onChangeTitleHandler}
        />
    ) : (
        <span onDoubleClick={activateEditMode} className={styles.taskName}>
            {title}
        </span>
    );
};
