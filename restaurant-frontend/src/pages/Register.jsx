import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
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

	    // FULL NAME
	    if (!formData.fullName.trim()) {

	        newErrors.fullName =
	            "Full name is required.";

	    } else if (formData.fullName.trim().length < 2) {

	        newErrors.fullName =
	            "Full name must be at least 2 characters.";

	    }

	    // EMAIL
	    if (!formData.email.trim()) {

	        newErrors.email =
	            "Email is required.";

	    } else if (
	        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
	    ) {

	        newErrors.email =
	            "Please enter a valid email.";

	    }

	    // PASSWORD
	    if (!formData.password) {

	        newErrors.password =
	            "Password is required.";

	    } else if (formData.password.length < 6) {

	        newErrors.password =
	            "Password must be at least 6 characters.";

	    }

	    // CONFIRM PASSWORD
	    if (!formData.confirmPassword) {

	        newErrors.confirmPassword =
	            "Please confirm your password.";

	    } else if (
	        formData.password !== formData.confirmPassword
	    ) {

	        newErrors.confirmPassword =
	            "Passwords do not match.";

	    }

	    // PHONE
	    if (!formData.phone.trim()) {

	        newErrors.phone =
	            "Phone number is required.";

	    } else if (
	        !/^[0-9+\-\s()]{7,20}$/.test(formData.phone)
	    ) {

	        newErrors.phone =
	            "Please enter a valid phone number.";

	    }

	    // IMPORTANT
	    setErrors(newErrors);

	    return Object.keys(newErrors).length === 0;
	};

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {

            await api.post(
                "/users/register",
                formData
            );

            alert("Registration successful!");

            navigate("/login");

        } catch (error) {

            console.error(error);

            if (error.response) {

                setErrors({
                    general:
                        error.response.data?.message ||
                        "Registration failed."
                });

            } else {

                setErrors({
                    general:
                        "Unable to connect to the server."
                });

            }

        }

    };

    return (

        <div
            className="container mt-5"
            style={{ maxWidth: "500px" }}
        >

            <h2 className="mb-4">
                Register
            </h2>

            {errors.general && (

                <div className="alert alert-danger">
                    {errors.general}
                </div>

            )}

            <form onSubmit={handleSubmit}>

                {/* FULL NAME */}

                <input
                    className={`form-control ${
                        errors.fullName
                            ? "is-invalid"
                            : ""
                    }`}
                    placeholder="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                />

                {errors.fullName && (

                    <div className="invalid-feedback mb-3">
                        {errors.fullName}
                    </div>

                )}

                {!errors.fullName && (
                    <div className="mb-3" />
                )}


                {/* EMAIL */}

                <input
                    className={`form-control ${
                        errors.email
                            ? "is-invalid"
                            : ""
                    }`}
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                {errors.email && (

                    <div className="invalid-feedback mb-3">
                        {errors.email}
                    </div>

                )}

                {!errors.email && (
                    <div className="mb-3" />
                )}


                {/* PASSWORD */}

                <input
                    className={`form-control ${
                        errors.password
                            ? "is-invalid"
                            : ""
                    }`}
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                {errors.password && (

                    <div className="invalid-feedback mb-3">
                        {errors.password}
                    </div>

                )}

                {!errors.password && (
                    <div className="mb-3" />
                )}


		{/* CONFIRM PASSWORD */}
		<input
    		className={`form-control ${
        	errors.confirmPassword ? "is-invalid" : ""
    		}`}
    		placeholder="Confirm Password"
    		name="confirmPassword"
    		type="password"
    		value={formData.confirmPassword}
    		onChange={handleChange}
		/>

		{errors.confirmPassword && (
    		<div className="invalid-feedback mb-3">
        	{errors.confirmPassword}
    	</div>
	)}

	{!errors.confirmPassword && (
    	<div className="mb-3" />
	)}


                {/* PHONE */}

                <input
                    className={`form-control ${
                        errors.phone
                            ? "is-invalid"
                            : ""
                    }`}
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />

                {errors.phone && (

                    <div className="invalid-feedback mb-3">
                        {errors.phone}
                    </div>

                )}

                {!errors.phone && (
                    <div className="mb-3" />
                )}



                <button
                    type="submit"
                    className="btn btn-primary w-100"
                >
                    Register
                </button>

            </form>

        </div>

    );

}

export default Register;