import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: ""
        });

    };

    const validate = () => {

        const newErrors = {};

        // Email
        if (!formData.email.trim()) {

            newErrors.email = "Email is required.";

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {

            newErrors.email = "Please enter a valid email.";

        }

        // Password
        if (!formData.password) {

            newErrors.password = "Password is required.";

        } else if (formData.password.length < 6) {

            newErrors.password =
                "Password must be at least 6 characters.";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {

            const response = await api.post(
                "/users/login",
                formData
            );

            console.log(response.data);

            login(response.data);

            alert("Login successful!");

            navigate("/");

        } catch (error) {

            console.error(error);

            setErrors({
                general: "Invalid email or password."
            });

        }

    };

    return (

        <div
            className="container mt-5"
            style={{ maxWidth: "500px" }}
        >

            <h2 className="mb-4">
                Login
            </h2>

            {errors.general && (

                <div className="alert alert-danger">
                    {errors.general}
                </div>

            )}

            <form onSubmit={handleSubmit}>

                {/* EMAIL */}

                <input
                    className={`form-control ${
                        errors.email ? "is-invalid" : ""
                    }`}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                {errors.email && (

                    <div className="invalid-feedback mb-3">
                        {errors.email}
                    </div>

                )}

                {!errors.email && <div className="mb-3" />}


                {/* PASSWORD */}

                <input
                    className={`form-control ${
                        errors.password ? "is-invalid" : ""
                    }`}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                {errors.password && (

                    <div className="invalid-feedback mb-3">
                        {errors.password}
                    </div>

                )}

                {!errors.password && <div className="mb-3" />}


                <button
                    type="submit"
                    className="btn btn-success w-100"
                >
                    Login
                </button>

            </form>

        </div>

    );

}

export default Login;