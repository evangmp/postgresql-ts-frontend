import {Link} from "react-router-dom";
import CSSConstants from "../../components/CSSConstant.tsx";
import React, {ChangeEvent, useState} from "react";
import IAccountData from "../../types/Account.tsx";
import SecurityService from "../../services/SecurityService.tsx";

const Connection = () => {
    const [link, setLink] = useState<string>("/tasks");
    const [message, setMessage] = useState<boolean>(false);

    // initialize the body to create the username/password variables
    const initialAccountState = {
        username: "",
        password: "",
        email: "",
        role: ["mod", "user"],
    };

    const [account, setAccount] = useState<IAccountData>(initialAccountState);

    // event active when something is type in username/password input
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        setAccount({ ...account, [name]: value });
    };

    // post method to sign in a user
    const signInUser = () => {
        if(account.password !== "" && account.username !== "" && account.username !== "") {
            const data = {
                username: account.username,
                password: account.password,
            };
            SecurityService.signIn(data)
                .then((response: any) => {
                    setAccount({
                        username: response.data.username,
                        password: response.data.password,
                        email: account.email,
                        role: account.role,
                    });
                    console.log(response.data);

                })
                .catch((e: Error) => {
                    setLink("/connection");
                    console.log(e);
                    setMessage(true);

                });
        }
    };

    return(
        <div>
            <div>
                Connection Part {message ? " : error, retry please" : ""}
            </div>

            <div>
                <div className="form-group">
                    <label htmlFor="username">Enter username : </label>
                    <input
                        style={CSSConstants.inputGeneralSettings}
                        type="text"
                        className="form-control"
                        id="username"
                        required
                        value={account.username}
                        onChange={handleInputChange}
                        name="username"
                    />
                </div>
            </div>

            <div>
                <div className="form-group">
                    <label htmlFor="password">Enter password : </label>
                    <input
                        style={CSSConstants.inputGeneralSettings}
                        type="password"
                        className="form-control"
                        id="password"
                        required
                        value={account.password}
                        onChange={handleInputChange}
                        name="password"
                    />
                </div>
            </div>

            <button>
                <Link to={"/"}>
                    Cancel
                </Link>
            </button>
            <button>
                <Link to={link} onClick={signInUser}>
                    submit
                </Link>
            </button>
            <button>
                <Link to={"/connection/create"}>
                    Create an account
                </Link>
            </button>
        </div>
    );
};

export default Connection;