import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

    const { cartItems } = useContext(CartContext);

    const navigate = useNavigate();

    const { user, logout } = useContext(AuthContext);

    

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link className="navbar-brand" to="/">
                    🍽 Restaurant
                </Link>

                <div className="navbar-nav ms-auto">

                    <Link className="nav-link" to="/">
                        Home
                    </Link>

                    

                    {!user && (
                        <>
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>

                            <Link className="nav-link" to="/register">
                                Register
                            </Link>
                        </>
                    )}

                    
    

                            {user && user.role === "CUSTOMER" && (
    <>
        <Link className="nav-link" to="/orders">
            My Orders
        </Link>

        <Link className="nav-link" to="/profile">
            Profile
        </Link>
    </>
)}

                    

                    {user && (
                        <>
                            <span className="nav-link">
                                Hello, {user.fullName}
                            </span>

                        <button
    				className="btn btn-outline-light ms-2"
    				onClick={() => {
        			logout();
        			navigate("/");
    			}}
			>
    				Logout
			</button>
                        </>
                    )}

                </div>

            </div>

        </nav>

    );
}

export default Navbar;