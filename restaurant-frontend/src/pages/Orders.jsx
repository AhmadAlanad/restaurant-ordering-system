import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Orders() {

    const { user } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        loadOrders();

    }, []);

    const loadOrders = async () => {
    try {
        const response = await api.get("/orders");
        setOrders(response.data);
    } catch (error) {
        console.error(error);
    }
};

    const getStatusColor = (status) => {

        switch (status) {

            case "PENDING":
                return "warning";

            case "ACCEPTED":
                return "success";

            case "REJECTED":
                return "danger";

            default:
                return "secondary";

        }

    };

    return (

        <div className="container mt-4">

            <h2>My Orders</h2>

            {orders.length === 0 ? (

                <p>You haven't placed any orders yet.</p>

            ) : (

                orders.map(order => (

                    <div
                        key={order.id}
                        className="card mb-4 shadow"
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <h4>
                                    Order #{order.id}
                                </h4>

				<p className="text-muted mb-2">
    				{new Date(order.orderDate).toLocaleString()}
				</p>

                                <span
                                    className={`badge bg-${getStatusColor(order.status)}`}
                                >
                                    {order.status}
                                </span>

                            </div>

                            <hr />

                            <ul className="list-group mb-3">

                                {order.items.map((item, index) => (

                                    <li
                                        key={index}
                                        className="list-group-item d-flex justify-content-between"
                                    >

                                        <span>

                                            {item.itemName} × {item.quantity}

                                        </span>

                                        <span>

                                            {item.price * item.quantity} SR

                                        </span>

                                    </li>

                                ))}

                            </ul>

                            <h5>

                                Total: {order.totalPrice} SR

                            </h5>

                            {order.rejectionReason && (

                                <div className="alert alert-danger mt-3">

                                    <strong>Reason:</strong>

                                    {" "}

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