import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";

import api from "../services/api";

function Profile() {

    const { user } = useContext(AuthContext);

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {

        if (user) {

            setFullName(user.fullName);
            setPhone(user.phone);

        }

    }, [user]);


    const saveProfile = async () => {

        try {

            const response = await api.put(
                `/users/${user.id}`,
                {
                    fullName,
                    phone
                }
            );

            alert("Profile updated successfully!");

            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );

            window.location.reload();

        } catch (error) {

            console.error(error);

            alert("Failed to update profile.");

        }

    };


    const changePassword = async () => {

        try {

            await api.put(
                `/users/${user.id}/change-password`,
                {
                    currentPassword,
                    newPassword
                }
            );

            alert("Password changed successfully!");

            setCurrentPassword("");
            setNewPassword("");

        } catch (error) {

            console.error(error);

            alert("Current password is incorrect.");

        }

    };


    return (

        <div className="container mt-4">

            <h2>My Profile</h2>

            <div className="card">

                <div className="card-body">

                    {/* FULL NAME */}

                    <div className="mb-3">

                        <label className="form-label">
                            Full Name
                        </label>

                        <input
                            className="form-control"
                            value={fullName}
                            onChange={(e) =>
                                setFullName(e.target.value)
                            }
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="mb-3">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            className="form-control"
                            value={user.email}
                            readOnly
                        />

                    </div>


                    {/* PHONE */}

                    <div className="mb-3">

                        <label className="form-label">
                            Phone
                        </label>

                        <input
                            className="form-control"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                        />

                    </div>


                    <button
                        className="btn btn-primary"
                        onClick={saveProfile}
                    >
                        Save Changes
                    </button>


                    <hr />


                    {/* CHANGE PASSWORD */}

                    <h4>Change Password</h4>

                    <div className="mb-3">

                        <label>
                            Current Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={currentPassword}
                            onChange={(e) =>
                                setCurrentPassword(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    <div className="mb-3">

                        <label>
                            New Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    <button
                        className="btn btn-warning"
                        onClick={changePassword}
                    >
                        Change Password
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Profile;