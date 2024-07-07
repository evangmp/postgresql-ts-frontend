import { useState } from "react";
import { Discipline, ITaskData } from "../../types/Task.ts";
import TaskDataService from "../../services/TaskService.tsx";
import CSSConstants from "../../components/CSSConstant.tsx";
import { Link } from "react-router-dom";
import { AxiosResponse } from "axios";

const AddTask = () => {
  // boolean to set the discipline checkboxes
  const [selectedDiscipline, setSelectedDiscipline] = useState<
    Discipline | undefined
  >(undefined);
  const [inputName, setInputName] = useState<string>("");

  const [taskSaved, setTaskSaved] = useState<boolean>(false);

  // post method to save the new task
  const submitTask = () => {
    // early return
    if (selectedDiscipline == null) {
      console.error("L'utilisateur n'a pas sélectionné de discipline");
      return;
    }
    if (inputName === "") {
      console.error("L'utilisateur n'a pas donné de nom à sa tâche");
      return;
    }

    const taskToSend: ITaskData = {
      id: undefined,
      name: inputName,
      discipline: selectedDiscipline,
      active: false,
      date: new Date().toLocaleString(),
    };

    console.log(taskToSend);

    TaskDataService.create(taskToSend)
      .then((response: AxiosResponse) => {
        console.debug(response);
        setTaskSaved(true);
      })
      .catch((e: Error) => {
        console.error(e);
      });
  };

  const resetInputs = () => {
    setTaskSaved(false);
    setSelectedDiscipline(undefined);
    setInputName("");
  };

  return (
    <div className="submit-form">
      {taskSaved ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button
            style={CSSConstants.buttonGeneralSettings}
            className="btn btn-success"
            onClick={resetInputs}
          >
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
              value={inputName}
              onChange={(event) => setInputName(event.target.value)}
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
              type="radio"
              className="checkbox-control-physic"
              name="physic-checkbox"
              checked={selectedDiscipline === "physics"}
              onChange={() => {
                setSelectedDiscipline("physics");
              }}
              value={"physics"}
            />

            <label htmlFor="physic-checkbox">Physics</label>

            <input
              id="math-checkbox"
              style={CSSConstants.inputGeneralSettings}
              type="radio"
              className="checkbox-control-maths"
              name="math-checkbox"
              checked={selectedDiscipline === "mathematics"}
              onChange={() => {
                setSelectedDiscipline("mathematics");
              }}
              value={"mathematics"}
            />
            <label htmlFor="math-checkbox">Mathematics</label>
          </div>
          <button
            style={CSSConstants.buttonGeneralSettings}
            onClick={submitTask}
            className="btn btn-success"
          >
            Submit
          </button>
          <button>
            <Link to={"/tasks"}>Return back</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTask;
