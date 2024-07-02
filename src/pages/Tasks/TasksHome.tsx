import CSSConstants from "../../components/CSSConstant.tsx";
import {Link, Route, Routes} from "react-router-dom";
import React, {CSSProperties, useState} from "react";
import GeneralConstants from "../../components/GeneralConstants.tsx";
import TasksList from "./TaskList.tsx";
import Task from "./Task.tsx";

const TasksHome = () => {
    const [button_return, setButton_return] = useState(false);

    const when_add_pressed = () => {
        setButton_return(!button_return);
    }
    const when_home_pressed = () => {
        setButton_return(true);
        console.log(GeneralConstants.connectionPageActive);
    }

    const buttonDiv: CSSProperties = {
        padding: '2rem',
    };

    return (
        <div>
            <nav className="navbar-main" style={buttonDiv}>
                <button style={CSSConstants.buttonMainPageSettings} className="choice-button">
                    <Link to={"/"} className="navbar-brand">
                        Log out
                    </Link>
                </button>
                <button style={CSSConstants.buttonMainPageSettings} className="choice-button">
                    <Link to={"/tasks/add"} className="nav-link-add">
                        Add
                    </Link>
                </button>
            </nav>

            <div>
                <Routes>
                    <Route path="/" element={<TasksList/>}/>
                    <Route path="/:id" element={<Task/>}/>
                </Routes>
            </div>

        </div>
    );
};

export default TasksHome;