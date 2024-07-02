import { routerType } from "../types/router.types";
import Home from './Home/Home.tsx';
import Connection from "./Connection/Connection.tsx";
import CreateAccount from "./CreateAccount/CreateAccount.tsx";
import TasksHome from "./Tasks/TasksHome.tsx";
import Task from "./Tasks/Task.tsx";
import AddTask from "./Tasks/AddTask.tsx";

const pagesData: routerType[] = [
    {
        path: "",
        element: <Home />,
        title: "home"
    },
    {
        path: "connection",
        element: <Connection />,
        title: "connectionPage"
    },
    {
        path: "connection/create",
        element: <CreateAccount/>,
        title: "createAccount"
    },
    {
        path: "tasks",
        element: <TasksHome/>,
        title: "tasksHome"
    },
    {
        path: "tasks",
        element: <Task/>,
        title: "task"
    },
    {
        path: "tasks/add",
        element: <AddTask/>,
        title: "addTask"
    },
    {
        path: "tasks/:id",
        element: <Task/>,
        title: "editTask"
    }
];

export default pagesData;
