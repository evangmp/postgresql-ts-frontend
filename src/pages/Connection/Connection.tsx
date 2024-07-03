import {Link} from "react-router-dom";
import CSSConstants from "../../components/CSSConstant.tsx";
import React, {ChangeEvent, useState} from "react";
import IAccountData from "../../types/Account.tsx";
import SecurityService from "../../services/SecurityService.tsx";

const Connection = () => {

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
                email: account.email,
                role: [],
            };
            SecurityService.signIn(data)
                .then((response: any) => {
                    setAccount({
                        username: response.data.username,
                        password: response.data.password,
                        email: response.data.email,
                        role: response.data.role,
                    });
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }
    };

    return(
        <div>
            <div>
                Connection Part
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
                    <label htmlFor="email">Enter email : </label>
                    <input
                        style={CSSConstants.inputGeneralSettings}
                        type="text"
                        className="form-control"
                        id="email"
                        required
                        value={account.email}
                        onChange={handleInputChange}
                        name="email"
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
                <Link to={"/tasks"} onClick={signInUser}>
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