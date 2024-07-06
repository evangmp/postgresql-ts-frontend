import {Link} from "react-router-dom";
import CSSConstants from "../../components/CSSConstant.tsx";
import React, {ChangeEvent, useState} from "react";
import IAccountData from "../../types/Account.tsx";

const Connection = () => {

    // initialize the body to create the username/password variables
    const initialAccountState = {
        username: "",
        password: "",
        email: "",
        role: [],
    };

    const [account, setAccount] = useState<IAccountData>(initialAccountState);

    // event active when something is type in username/password input
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        setAccount({ ...account, [name]: value });
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
                submit
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