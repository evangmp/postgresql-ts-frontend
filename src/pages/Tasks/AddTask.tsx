import React, {ChangeEvent, useState} from "react";
import ITaskData from "../../types/Task.tsx";
import TaskDataService from "../../services/TaskService.tsx";
import CSSConstants from "../../components/CSSConstant.tsx";
import {Link} from "react-router-dom";

const AddTask = () => {
    // initialize the body to create the task variable
    const initialTutorialState = {
        id: 1111,
        name: "",
        discipline: "",
        active: false,
        date: "",
    };
    const [task, setTask] = useState<ITaskData>(initialTutorialState);

    // to know if the user as clicked on submit or is still creating the task
    const [active, setActive] = useState<boolean>(false);

    // boolean to set the discipline checkboxes
    const [mathsDiscipline, setMathsDiscipline] = useState<boolean>(false);
    const [physicsDiscipline, setPhysicDiscipline] = useState<boolean>(false);

    // date variable to save the time when the user click to save the task (and it helps to print the task at the good date)
    const [date, setDate] = useState<Date>(null);


    // event active when something is type in name input
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        setTask({ ...task, [name]: value });
        setDate(new Date()); // more calculation than if it is only in the saveTutorial const but i have an error
        // (date is null, time probably too short to save between the Data() function call and the post method)
    };

    // post method to save the new task
    const saveTutorial = () => {
        setDate(new Date());
        if(mathsDiscipline) {
            task.discipline = "mathematics";
        }
        if(physicsDiscipline) {
            task.discipline = "physics";
        }
        if(task.name !== "" && task.discipline !== "") {
            const data = {
                id: task.id,
                name: task.name,
                discipline: task.discipline,
                active: task.active,
                date: date.toLocaleString(),
            };
            console.log(data);

            TaskDataService.create(data)
                .then((response: any) => {
                    setTask({
                        id: response.data.id,
                        name: response.data.name,
                        discipline: response.data.discipline,
                        active: response.data.active,
                        date: task.date,
                    });
                    setActive(true);
                    console.log(response.data);
                    console.log(response.config);
                })
                .catch((e: Error) => {
                    console.log(e);
                    console.log("erreureureur 1");
                });}
    };


    const newTutorial = () => {
        setTask(initialTutorialState);
        setActive(false);
    };

    return(
        <div className="submit-form">
            {active ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button
                        style={CSSConstants.buttonGeneralSettings}
                        className="btn btn-success"
                        onClick={newTutorial}>
                        Add
                    </button>

                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Enter Name : </label>
                        <input
                            style={CSSConstants.inputGeneralSettings}
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={task.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="choice">Choose a discipline : </label>
                    </div>
                    <div className="form-group">
                        <input
                            id="physic-checkbox"
                            style={CSSConstants.inputGeneralSettings}
                            type="checkbox"
                            className="checkbox-control-physic"
                            defaultChecked={physicsDiscipline}
                            onClick={() => {
                                setPhysicDiscipline(!physicsDiscipline);
                            }}
                            name="physic-checkbox"
                            disabled={mathsDiscipline}
                        />

                        <label htmlFor="physic-checkbox">Physics</label>

                        <input
                            id="math-checkbox"
                            style={CSSConstants.inputGeneralSettings}
                            type="checkbox"
                            className="checkbox-control-maths"
                            defaultChecked={mathsDiscipline}
                            onClick={() => {
                                setMathsDiscipline(!mathsDiscipline);
                            }}
                            name="math-checkbox"
                            disabled={physicsDiscipline}
                        />
                        <label htmlFor="math-checkbox">Mathematics</label>

                    </div>
                    <button
                        style={CSSConstants.buttonGeneralSettings}
                        onClick={saveTutorial}
                        className="btn btn-success">
                        Submit
                    </button>
                    <button>
                        <Link to={"/tasks"}>
                            Return back
                        </Link>
                    </button>
                </div>

            )}
        </div>
    );
};

export default AddTask;