import { useState } from "react";
import { ToDoList } from "./components/TodoList/TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";

type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TaskItemType = {
    id: string;
    name: string;
    isDone: boolean;
};

type TaskObjType = {
    [key: string]: TaskItemType[];
};

export type FilterValuesType = "all" | "active" | "complited";

const todoListId1 = v1();
const todoListId2 = v1();

const App = () => {
    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        { id: todoListId1, title: "Что учить", filter: "all" },
        { id: todoListId2, title: "Что посмотреть", filter: "all" },
    ]);

    const [tasksObj, setTasks] = useState<TaskObjType>({
        [todoListId1]: [
            { id: v1(), name: "JS", isDone: true },
            { id: v1(), name: "CSS", isDone: true },
            { id: v1(), name: "React", isDone: false },
            { id: v1(), name: "Redux", isDone: false },
            { id: v1(), name: "Html", isDone: true },
        ],
        [todoListId2]: [
            { id: v1(), name: "JS", isDone: true },
            { id: v1(), name: "CSS", isDone: true },
        ],
    });

    const addTaskItem = (value: string, todoListId: string) => {
        const newTask = { id: v1(), name: value, isDone: false };
        const tasks = tasksObj[todoListId];
        tasksObj[todoListId] = [newTask, ...tasks];
        setTasks({ ...tasksObj });
    };

    const removeTaskItem = (taskId: string, todoListId: string) => {
        const tasks = tasksObj[todoListId];
        const filteredTasks = tasks.filter((task) => task.id !== taskId);
        tasksObj[todoListId] = filteredTasks;
        setTasks({ ...tasksObj });
    };

    const changeStatus = (
        taskId: string,
        isDone: boolean,
        todoListId: string
    ) => {
        const tasks = tasksObj[todoListId];
        const task = tasks.find((task) => task.id === taskId);
        if (task) task.isDone = isDone;
        setTasks({ ...tasksObj });
    };

    const changeFilter = (value: FilterValuesType, id: string) => {
        const newTodoList = todoLists.find((todoList) => todoList.id === id);
        if (newTodoList) newTodoList.filter = value;
        setTodoLists([...todoLists]);
    };

    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        const tasks = tasksObj[todoListId];
        const task = tasks.find((task) => task.id === taskId);
        if (task) task.name = newTitle;
        setTasks({ ...tasksObj });
    }

    const removeTodoList = (todoListId: string) => {
        const filteredTodoLists = todoLists.filter(
            (todoList) => todoList.id !== todoListId
        );
        setTodoLists(filteredTodoLists);
        delete tasksObj[todoListId];
    };
    
    const onChangeTodoListTitle = (todoListId: string, newTitle: string) => {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if(todoList) todoList.title = newTitle
        setTodoLists([...todoLists])
    }

    const addTodoList = (title: string) => {
        const todoList: TodoListType = {
            id: v1(),
            title,
            filter: "all",
        };
        setTodoLists([todoList, ...todoLists]);
        setTasks({ ...tasksObj, [todoList.id]: [] });
    };



    return (
        <div className="App">
            <div className="addForm">
                <AddItemForm addItem={addTodoList} />
            </div>

            <div className="wrapper">
                {todoLists.map((todoList) => {
                    let tasksForTodoList = tasksObj[todoList.id];
                    if (todoList.filter === "complited") {
                        tasksForTodoList = tasksForTodoList.filter(
                            (task) => task.isDone === true
                        );
                    }
                    if (todoList.filter === "active") {
                        tasksForTodoList = tasksForTodoList.filter(
                            (task) => task.isDone === false
                        );
                    }

                    return (
                        <ToDoList
                            id={todoList.id}
                            title={todoList.title}
                            tasks={tasksForTodoList}
                            addTaskItem={addTaskItem}
                            removeTaskItem={removeTaskItem}
                            changeFilter={changeFilter}
                            changeStatus={changeStatus}
                            changeTaskTitle={changeTaskTitle}
                            onChangeTodoListTitle={onChangeTodoListTitle}
                            removeTodoList={removeTodoList}
                            filter={todoList.filter}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default App;
