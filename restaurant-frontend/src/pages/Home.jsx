import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AddressContext } from "../context/AddressContext";

import "../styles/home.css";

function Home() {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [addressLabel, setAddressLabel] = useState("");
    const [addressDescription, setAddressDescription] = useState("");
    const [locationLoading, setLocationLoading] = useState(false);
    const [locationError, setLocationError] = useState("");
	const [restaurantOpen, setRestaurantOpen] = useState(true);

    const { selectedAddress, setSelectedAddress } =
        useContext(AddressContext);


    // Load customer addresses

    useEffect(() => {

        if (user && user.role === "CUSTOMER") {
            loadAddresses();
        }

    }, [user]);
	
	useEffect(() => {
	    const loadRestaurantStatus = async () => {
	        try {
	            const response = await api.get("/restaurant/status");
	            setRestaurantOpen(response.data.open);
	        } catch (error) {
	            console.error(
	                "Failed to load restaurant status:",
	                error
	            );
	        }
	    };

	    loadRestaurantStatus();
	}, []);


    const loadAddresses = async () => {

        try {

            const response = await api.get(
                `/addresses/${user.id}`
            );

            setAddresses(response.data);

        } catch (error) {

            console.error(error);

        }

    };


    // Add new customer address

    const addAddress = () => {

        if (!addressLabel.trim()) {

            setLocationError(
                "Please enter an address name."
            );

            return;
        }

        if (!addressDescription.trim()) {

            setLocationError(
                "Please enter an address description."
            );

            return;
        }

        if (!navigator.geolocation) {

            setLocationError(
                "Geolocation is not supported by your browser."
            );

            return;
        }

        setLocationError("");
        setLocationLoading(true);

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;

                try {

                    await api.post(
                        `/addresses/${user.id}`,
                        {
                            label: addressLabel,
                            description: addressDescription,
                            latitude: latitude,
                            longitude: longitude
                        }
                    );

                    alert(
                        "Address saved successfully!"
                    );

                    setAddressLabel("");
                    setAddressDescription("");
                    setShowAddressForm(false);

                    await loadAddresses();

                } catch (error) {

                    console.error(error);

                    setLocationError(
                        "Failed to save address."
                    );

                } finally {

                    setLocationLoading(false);

                }

            },

            (error) => {

                console.error(error);

                if (error.code === 1) {

                    setLocationError(
                        "Location permission was denied."
                    );

                } else if (error.code === 2) {

                    setLocationError(
                        "Location information is unavailable."
                    );

                } else if (error.code === 3) {

                    setLocationError(
                        "Location request timed out."
                    );

                } else {

                    setLocationError(
                        "Unable to get your location."
                    );

                }

                setLocationLoading(false);

            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }

        );

    };


    // Delete customer address

    const deleteAddress = async (addressId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this address?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `/addresses/${user.id}/${addressId}`
            );

            if (selectedAddress?.id === addressId) {
                setSelectedAddress(null);
            }

            await loadAddresses();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to delete address."
            );

        }

    };
	
	const openRestaurant = async () => {
	    try {
	        await api.put("/restaurant/open");
	        setRestaurantOpen(true);
	        alert("Restaurant is now open.");
	    } catch (error) {
	        console.error(error);
	        alert("Failed to open the restaurant.");
	    }
	};

	const closeRestaurant = async () => {
	    try {
	        await api.put("/restaurant/close");
	        setRestaurantOpen(false);
	        alert("Restaurant is now closed.");
	    } catch (error) {
	        console.error(error);
	        alert("Failed to close the restaurant.");
	    }
	};


    return (

        <div className="container home-page">

            {/* HEADER */}

            <div className="home-header">

                <h1 className="display-4">
                    🍽 Restaurant Ordering System
                </h1>

                <p className="lead">
                    Delicious food delivered fast.
                </p>

            </div>
			
			<div className="mt-4 text-center">
			    {restaurantOpen ? (
			        <div className="alert alert-success">
			            🟢 <strong>Restaurant is Open</strong>
			            <br />
			            You can browse the menu and place your order.
			        </div>
			    ) : (
			        <div className="alert alert-danger">
			            🔴 <strong>Restaurant is Closed</strong>
			            <br />
			            You can browse the menu, but ordering is currently unavailable.
			        </div>
			    )}
			</div>


            {/* CUSTOMER HOME */}

            {user && user.role === "CUSTOMER" && (

                <>

                    {/* MY ADDRESSES */}

                    <div className="card shadow mt-4">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <h4 className="mb-0">
                                    📍 My Addresses
                                </h4>

                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        setShowAddressForm(
                                            !showAddressForm
                                        )
                                    }
                                >
                                    ➕ Add New Address
                                </button>

                            </div>


                            {/* ADD ADDRESS FORM */}

                            {showAddressForm && (

                                <div className="card bg-light mt-4">

                                    <div className="card-body">

                                        <h5>
                                            Add New Address
                                        </h5>

                                        <label className="form-label">
                                            Address Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="Example: Home, University, Work"
                                            value={addressLabel}
                                            onChange={(e) =>
                                                setAddressLabel(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <label className="form-label">
                                            Address Description
                                        </label>

                                        <textarea
                                            className="form-control mb-3"
                                            rows="3"
                                            placeholder="Example: Building 5, Apartment 8, 2nd floor"
                                            value={addressDescription}
                                            onChange={(e) =>
                                                setAddressDescription(
                                                    e.target.value
                                                )
                                            }
                                            maxLength="500"
                                        />

                                        <small className="text-muted d-block mb-3">
                                            Add details that will help
                                            with delivery.
                                        </small>

                                        <p className="text-muted">
                                            Your current GPS location
                                            will be saved with this
                                            address.
                                        </p>

                                        <button
                                            className="btn btn-success"
                                            onClick={addAddress}
                                            disabled={locationLoading}
                                        >
                                            {locationLoading
                                                ? "Getting Location..."
                                                : "📍 Use My Current Location"}
                                        </button>

                                        {locationError && (

                                            <div className="alert alert-danger mt-3">
                                                {locationError}
                                            </div>

                                        )}

                                    </div>

                                </div>

                            )}


                            {/* SAVED ADDRESSES */}

                            {addresses.length === 0 ? (

                                <div className="alert alert-info mt-4">
                                    You don't have any saved addresses yet.
                                </div>

                            ) : (

                                <div className="row mt-4">

                                    {addresses.map(address => (

                                        <div
                                            className="col-md-4 mb-3"
                                            key={address.id}
                                        >

                                            <div className="card address-card">

                                                <div className="card-body">

                                                    <h5>
                                                        📍 {address.label}
                                                    </h5>

                                                    <p className="mb-3">

                                                        <strong>
                                                            Address Description:
                                                        </strong>

                                                        <br />

                                                        {address.description}

                                                    </p>

                                                    <p className="text-muted">

                                                        Latitude:{" "}
                                                        {address.latitude}

                                                        <br />

                                                        Longitude:{" "}
                                                        {address.longitude}

                                                    </p>

                                                    <div className="address-actions">

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                deleteAddress(
                                                                    address.id
                                                                )
                                                            }
                                                        >
                                                            🗑 Delete
                                                        </button>

                                                        <button
                                                            className={
                                                                selectedAddress?.id === address.id
                                                                    ? "btn btn-success"
                                                                    : "btn btn-primary"
                                                            }
                                                            onClick={() =>
                                                                setSelectedAddress(
                                                                    address
                                                                )
                                                            }
                                                        >
                                                            {selectedAddress?.id === address.id
                                                                ? "✓ Selected"
                                                                : "Select"}
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                    </div>


                    {/* CUSTOMER MENU */}

                    <div className="row mt-4">

                        <div className="col-md-6 mb-4">

                            <div className="card shadow home-menu-card">

                                <div className="card-body">

                                    <h3>
                                        🍕 Menu
                                    </h3>

                                    <p>
                                        Browse our delicious menu
                                        and place your order.
                                    </p>

                                    <button
                                        className="btn btn-primary btn-lg"
                                        onClick={() =>
                                            navigate("/menu")
                                        }
                                    >
                                        View Menu
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </>

            )}


            {/* ADMIN HOME */}

            {user && user.role === "ADMIN" && (

                <div className="row mt-5">

                    {/* DASHBOARD */}

                    <div className="col-md-4 mb-4">

                        <div className="card shadow home-admin-card">

                            <div className="card-body">

                                <h3>
                                    📊 Dashboard
                                </h3>

                                <p>
                                    View orders and manage
                                    restaurant operations.
                                </p>

                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        navigate("/dashboard")
                                    }
                                >
                                    Open Dashboard
                                </button>

                            </div>

                        </div>

                    </div>


                    {/* MANAGE MENU */}

                    <div className="col-md-4 mb-4">

                        <div className="card shadow home-admin-card">

                            <div className="card-body">

                                <h3>
                                    🍔 Manage Menu
                                </h3>

                                <p>
                                    Add, edit and remove menu
                                    items and categories.
                                </p>

                                <button
                                    className="btn btn-success"
                                    onClick={() =>
                                        navigate("/admin/menu")
                                    }
                                >
                                    Manage Menu
                                </button>

                            </div>

                        </div>

                    </div>


                    {/* SALES REPORT */}

                    <div className="col-md-4 mb-4">

                        <div className="card shadow home-admin-card">

                            <div className="card-body">

                                <h3>
                                    💰 Sales Report
                                </h3>

                                <p>
                                    View revenue and order
                                    statistics.
                                </p>

                                <button
                                    className="btn btn-warning"
                                    onClick={() =>
                                        navigate("/reports")
                                    }
                                >
                                    View Sales Report
                                </button>

                            </div>

                        </div>

                    </div>
					
					{/* RESTAURANT STATUS */}

					<div className="col-md-4 mb-4">

					    <div className="card shadow home-admin-card">

					        <div className="card-body">

					            <h3>
					                🍽 Restaurant Status
					            </h3>

					            {restaurantOpen ? (
					                <>
					                    <p className="text-success">
					                        🟢 Restaurant is currently <strong>OPEN</strong>.
					                    </p>

					                    <button
					                        className="btn btn-danger"
					                        onClick={closeRestaurant}
					                    >
					                        🔴 Close Restaurant
					                    </button>
					                </>
					            ) : (
					                <>
					                    <p className="text-danger">
					                        🔴 Restaurant is currently <strong>CLOSED</strong>.
					                    </p>

					                    <button
					                        className="btn btn-success"
					                        onClick={openRestaurant}
					                    >
					                        🟢 Open Restaurant
					                    </button>
					                </>
					            )}

					        </div>

					    </div>

					</div>

                </div>

            )}

        </div>

    );

}

export default Home;