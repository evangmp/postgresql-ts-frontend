import React, {CSSProperties, useEffect, useState} from "react";
import ITaskData from "../../types/Task.tsx";
import TaskDataService from "../../services/TaskService.tsx";
import CSSConstants from "../../components/CSSConstant.tsx";
import {Link} from "react-router-dom";
import DateFunction from "../Date/DateFunction.tsx";

const TaskList = () => {

    // to set task
    const [tasks, setTasks] = useState<Array<ITaskData>>([]);

    // i will see, error in console, because each child of the list don't have a unique key, so it'll be useful
    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    // to set date and send it to the DateAlgo
    const [date, setDate] = useState<Date>(new Date());


    // when its run call the const to have all the tasks and setDate (if not date is null)
    useEffect(() => {
        retrieveTutorials();
        setDate(new Date());
    }, []);


    // get method to bring all the tasks from the DB
    const retrieveTutorials = () => {
        TaskDataService.getAll()
            .then((response: any) => {
                setTasks(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    // put method to update the state of task, event when click on checkbox
    const updatePublished = (task: ITaskData) => {
        const data = {
            id: task.id,
            name: task.name,
            discipline: task.discipline,
            active: !task.active,
            date: task.date,
        };
        TaskDataService.update(task.id, data)
            .then((response: any) => {
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };


    // useful to set if the task needs to be print, with DateAlgo
    const hiddenOrNo = (task: ITaskData) => {
        // will call another const, this one will compare the date of the task and the actual date,
        // to render if the task will be print or no with a boolean
        const printOrNo = DateFunction.DateIdea(task, date);
        console.log("Task : " + task.name + ", is good or no : " + printOrNo);
        return printOrNo
    }


    // CSS Style
    const tasksListTitle: CSSProperties = {
        font: '3.5rem "Fira Sans", sans-serif', // "small-caps bold 24px/1 sans-serif",
    }
    const listGeneralSettings: CSSProperties = {
        listStyleType: "none",
    }
    const divTaskSetting: CSSProperties = {
        WebkitFontSmoothing: "antialiasing",
        boxSizing: "border-box",
        clear: "left",
        display: "block",
        fontFamily: "Arial, sans-serif",
        fontSize: "1.6rem",
        fontWeight: 400,
        lineHeight: 1.25,
        minHeight: "44px",
        paddingLeft: "40px",
        position: "relative",
        flex: "0 0 100%",
    }

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4 style={tasksListTitle}>Tasks List</h4>

                <ul className="list-group">
                    {tasks && tasks.map((task, index) => (
                        <div style={{padding: '2rem'}}>
                            <li style={listGeneralSettings}
                                className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                key={task.id}
                                hidden={!hiddenOrNo(task)}
                            >
                                <div style={divTaskSetting}>
                                    <input
                                        type="checkbox"
                                        defaultChecked={task.active}
                                        onChange={() => {
                                            updatePublished(task);
                                            task.active = !task.active;
                                        }}
                                    />
                                    <label style={CSSConstants.inputGeneralSettings}>{task.name}</label>
                                </div>

                                <div style={divTaskSetting}>
                                    <label>Discipline : {task.discipline}</label>
                                </div>

                                <div style={divTaskSetting}>
                                    <button /*style={CSSConstants.buttonMainPageSettings}*/>
                                        <Link
                                            to={"/tasks/" + task.id}
                                            className="nav-link-edit"
                                        >
                                            Edit
                                        </Link>
                                    </button>
                                </div>
                            </li>
                        </div>
                        )
                    )}
                </ul>
            </div>
            <div className="col-md-6">
                {tasks ? (
                    <div>
                        <p>Open bar to learn</p>
                        <br/>
                    </div>

                ) : (
                    <div>No task saved</div>
                )}
            </div>
        </div>
    );
};

export default TaskList;