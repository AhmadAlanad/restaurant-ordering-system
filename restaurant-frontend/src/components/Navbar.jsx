import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import Notifications from "./Notifications";

import "../styles/navbar.css";

function Navbar() {

    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link
                    className="navbar-brand"
                    to="/"
                >
                    🍽 Restaurant
                </Link>

                <div className="navbar-nav ms-auto">

                    <Link
                        className="nav-link"
                        to="/"
                    >
                        Home
                    </Link>

                    {!user && (
                        <>
                            <Link
                                className="nav-link"
                                to="/login"
                            >
                                Login
                            </Link>

                            <Link
                                className="nav-link"
                                to="/register"
                            >
                                Register
                            </Link>
                        </>
                    )}

                    {user && user.role === "CUSTOMER" && (
                        <>
                            <Link
                                className="nav-link"
                                to="/orders"
                            >
                                My Orders
                            </Link>

                            <Link
                                className="nav-link"
                                to="/profile"
                            >
                                Profile
                            </Link>
                        </>
                    )}

                    {user && (
                        <div className="navbar-user">

                            <Notifications />

                            <span className="nav-link navbar-user-name">
                                Hello, {user.fullName}
                            </span>

                            <button
                                className="btn btn-outline-light navbar-logout"
                                onClick={() => {
                                    logout();
                                    navigate("/");
                                }}
                            >
                                Logout
                            </button>

                        </div>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;