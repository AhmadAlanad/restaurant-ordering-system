import { useEffect, useState, useContext } from "react";

import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

import "../styles/orders.css";

function Orders() {

    const { user } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (user) {
            loadOrders();
        }

    }, [user]);

    const loadOrders = async () => {

        try {

            const response = await api.get(
                `/orders/user/${user.id}`
            );

            setOrders(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    const getStatusColor = (status) => {

        switch (status) {

            case "PENDING":
                return "warning";

            case "ACCEPTED":
                return "success";

            case "PREPARING":
                return "info";

            case "READY":
                return "primary";

            case "DELIVERED":
                return "dark";

            case "REJECTED":
                return "danger";

            default:
                return "secondary";
        }
    };

    if (loading) {

        return (
            <div className="container orders-page">

                <h2>My Orders</h2>

                <p>Loading...</p>

            </div>
        );
    }

    return (

        <div className="container orders-page">

            <h2>My Orders</h2>

            {orders.length === 0 ? (

                <div className="alert alert-info">
                    You haven't placed any orders yet.
                </div>

            ) : (

                orders.map(order => (

                    <div
                        key={order.id}
                        className="card shadow order-card"
                    >

                        <div className="card-body">

                            {/* HEADER */}

                            <div className="order-header">

                                <div>

                                    <h4>
                                        Order #{order.id.substring(0, 8)}
                                    </h4>

                                    <p className="text-muted order-date">

                                        {new Date(
                                            order.orderDate
                                        ).toLocaleString()}

                                    </p>

                                </div>

                                <span
                                    className={`badge bg-${getStatusColor(
                                        order.status
                                    )}`}
                                >
                                    {order.status}
                                </span>

                            </div>

                            <hr />


                            {/* DELIVERY ADDRESS */}

                            <h5 className="order-section-title">
                                📍 Delivery Address
                            </h5>

                            <p className="mb-1">

                                <strong>Name:</strong>{" "}
                                {order.addressLabel}

                            </p>

                            <p className="mb-1">

                                <strong>Description:</strong>{" "}
                                {order.addressDescription}

                            </p>

                            <hr />


                            {/* PAYMENT */}

                            <h5 className="order-section-title">
                                💳 Payment Method
                            </h5>

                            <p>

                                {order.paymentMethod === "CASH"
                                    ? "Cash"
                                    : "Credit Card"}

                            </p>


                            {/* NOTE */}

                            {order.customerNote && (

                                <>

                                    <h5 className="order-section-title">
                                        📝 Note
                                    </h5>

                                    <p>
                                        {order.customerNote}
                                    </p>

                                </>

                            )}

                            <hr />


                            {/* ITEMS */}

                            <h5 className="order-section-title">
                                🍽 Ordered Items
                            </h5>

                            <ul className="list-group mb-3">

                                {order.items.map(
                                    (item, index) => (

                                        <li
                                            key={index}
                                            className="list-group-item d-flex justify-content-between"
                                        >

                                            <span>

                                                {item.itemName}
                                                {" × "}
                                                {item.quantity}

                                            </span>

                                            <strong>

                                                {item.price *
                                                    item.quantity}{" "}
                                                TL

                                            </strong>

                                        </li>

                                    )
                                )}

                            </ul>


                            {/* TOTAL */}

                            <h4 className="order-total">

                                Total: {order.totalPrice} TL

                            </h4>


                            {/* REJECTION REASON */}

                            {order.rejectionReason && (

                                <div className="alert alert-danger order-rejection">

                                    <strong>
                                        Rejection Reason:
                                    </strong>{" "}

                                    {order.rejectionReason}

                                </div>

                            )}

                        </div>

                    </div>

                ))

            )}

        </div>
    );
}

export default Orders;