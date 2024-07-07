import {Link, useNavigate, useParams} from "react-router-dom";
import React, {ChangeEvent, useEffect, useState} from "react";
import {ITaskData} from "../../types/Task.ts";
import TaskDataService from "../../services/TaskService.tsx";
import CSSConstants from "../../components/CSSConstant.tsx";

const Task = () => {
    const { id }= useParams();
    const navigate = useNavigate();

    const initialTaskState = {
        id: null,
        name: "",
        discipline: "",
        active: false,
        date: "",
    };

    const [currentTask, setCurrentTask] = useState<ITaskData>(initialTaskState);
    const [message, setMessage] = useState<string>("");

    // get method to have the task
    const getTask = (id: string) => {
        TaskDataService.get(id)
            .then((response: any) => {
                setCurrentTask(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getTask(id);
    }, [id]);

    const testDefineConst = (discipline: string, which: number) => {
        /*
        let test: boolean = discipline==="physics";
        console.log("test physique : " + test);
        test = discipline==="mathematics";
        console.log("test mathematics : " + test); */
        if(which===0) {
            if(discipline==="physics") {return true}
        }
        if(which===1) {
            if(discipline==="mathematics") {return true}
        }
        return false;
    };

    // boolean to set the discipline checkboxes
    const [mathsDiscipline, setMathsDiscipline] = useState<boolean>(testDefineConst(currentTask.discipline, 0));
    const [physicsDiscipline, setPhysicDiscipline] = useState<boolean>(testDefineConst(currentTask.discipline, 1));

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        setCurrentTask({ ...currentTask, [name]: value });
    };

    const updateTutorial = () => {
        if(mathsDiscipline) {
            currentTask.discipline = "mathematics";
        }
        if(physicsDiscipline) {
            currentTask.discipline = "physics";
        }
        TaskDataService.update(currentTask.id, currentTask)
            .then((response: any) => {
                console.log(response.data);
                setMessage("The tutorial was updated successfully!");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteTutorial = () => {
        TaskDataService.remove(currentTask.id)
            .then((response: any) => {
                console.log(response.data);
                navigate("/tasks/");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <div className="taskApp large-container-2">
            {currentTask ? (
                <div className="container-edit-form-1">
                    <h4 className="edit-title-1">Tutorial</h4>
                    <form className="form-edit-1">
                        <div className="form-group-1">
                            <label htmlFor="name" className="form-label-1">Name : </label>
                            <input
                                type="text"
                                className="form-input-1"
                                id="name"
                                name="name"
                                value={currentTask.name}
                                onChange={handleInputChange}
                                style={CSSConstants.inputGeneralSettings}
                            />
                        </div>

                        <div className="form-group-2">
                            <label htmlFor="discipline" className="form-label-2">Discipline : </label>
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
                    </form>
                    <button
                        style={CSSConstants.buttonConnectionPageSettings}
                        className="edit-button-3"
                        onClick={deleteTutorial}>
                        Delete
                    </button>

                    <button
                        style={CSSConstants.buttonConnectionPageSettings}
                        type="submit"
                        className="edit-button-4"
                        onClick={updateTutorial}
                    >
                        Update
                    </button>
                    <p className="p-edit-1">{message}</p>
                    <div>
                        <button style={CSSConstants.buttonConnectionPageSettings}>
                            <Link to={"/tasks/"}>
                                Cancel
                            </Link>
                        </button>
                    </div>
                </div>

            ) : (
                <div>
                    <br/>
                    <p className="p-edit-2">You can click on a tutorial</p>
                </div>
            )}
        </div>
    );
};

export default Task;