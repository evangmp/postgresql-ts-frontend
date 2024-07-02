import React, {CSSProperties} from "react";
import {Link} from "react-router-dom";

import CSSConstants from "../../components/CSSConstant.tsx";

const Home = () => {
    // CSS properties
    const buttonDiv: CSSProperties = {
        padding: '2rem',
    };


    return (
        <div>
            <div style={buttonDiv}>
                <button style={CSSConstants.buttonConnectionPageSettings} className="connection-button">
                    with Google
                </button>
                <div style={buttonDiv}>
                    <button style={CSSConstants.buttonConnectionPageSettings} className="connection-button">
                        <Link to={"/connection"}>
                            log in
                        </Link>
                    </button>
                </div>

                <div style={buttonDiv}>
                    <button style={CSSConstants.buttonConnectionPageSettings} className="connection-button">
                        <Link to={"/connection/create"}>
                            create an account
                        </Link>
                    </button>
                </div>
                <div style={buttonDiv}>
                    <button style={CSSConstants.buttonConnectionPageSettings} className="connection-button">
                        <Link to={"/tasks"} className="nav-link-return">
                            skip connection
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;

