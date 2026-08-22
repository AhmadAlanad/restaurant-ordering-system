import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [dashboard, setDashboard] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    });

    useEffect(() => {
        loadOrders();
	loadDashboard();
    }, []);

	const loadDashboard = async () => {

    try {

        const response = await api.get("/dashboard");
	console.log("Dashboard:", response.data);
        setDashboard(response.data);

    } catch (error) {

        console.error(error);

    }

};

    const loadOrders = async () => {
        try {
            const response = await api.get("/orders");
            setOrders(response.data);
        } catch (error) {
            console.error(error);
        }
    };

const refreshSelectedOrder = async (id) => {

    try {

        const response = await api.get(`/orders/${id}`);

        setSelectedOrder(response.data);

        loadOrders();
        loadDashboard();

    } catch (error) {

        console.error(error);

    }

};

const openOrderDetails = (order) => {

    console.log(order);

    setSelectedOrder(order);

    setShowOrderModal(true);

};

	const acceptOrder = async (id) => {

    try {

        await api.put(`/orders/${id}/accept`);

        await refreshSelectedOrder(id);

    } catch (error) {

        console.error(error);

        alert("Failed to accept order.");

    }

};

	const rejectOrder = async (id) => {

    const reason = prompt("Enter rejection reason:");

    if (!reason) return;

    try {

        await api.put(`/orders/${id}/reject`, {
            reason: reason
        });

        await refreshSelectedOrder(id);

    } catch (error) {

        console.error(error);

        alert("Failed to reject order.");

    }

};

const preparingOrder = async (id) => {

    try {

        await api.put(`/orders/${id}/preparing`);

        await refreshSelectedOrder(id);

    } catch (error) {

        console.error(error);

        alert("Failed to update order.");

    }

};

const readyOrder = async (id) => {

    try {

        await api.put(`/orders/${id}/ready`);

        await refreshSelectedOrder(id);

    } catch (error) {

        console.error(error);

        alert("Failed to update order.");

    }

};

const deliveredOrder = async (id) => {

    try {

        await api.put(`/orders/${id}/delivered`);

        await refreshSelectedOrder(id);

    } catch (error) {

        console.error(error);

        alert("Failed to update order.");

    }

};

		const getStatusBadge = (status) => {

    switch (status) {

        case "PENDING":
            return "bg-warning";

        case "ACCEPTED":
            return "bg-success";

        case "PREPARING":
            return "bg-primary";

        case "READY":
            return "bg-info";

        case "DELIVERED":
            return "bg-dark";

        case "REJECTED":
            return "bg-danger";

        default:
            return "bg-secondary";
    }
};
    return (

    <div className="container mt-4">

	<div className="row mb-4">

    <div className="col-md-4 mb-3">
        <div className="card text-center shadow">
            <div className="card-body">
                <h5>Total Orders</h5>
                <h2>{dashboard.totalOrders}</h2>
            </div>
        </div>
    </div>

    <div className="col-md-4 mb-3">
        <div className="card text-center shadow">
            <div className="card-body">
                <h5>Pending</h5>
                <h2 className="text-warning">
                    {dashboard.pendingOrders}
                </h2>
            </div>
        </div>
    </div>


<div className="col-md-6 mb-3">
    <div className="card text-center shadow">
        <div className="card-body">
            <h5>Orders Today</h5>
            <h2 className="text-info">
                {dashboard.todayOrders}
            </h2>
        </div>
    </div>
</div>

   <div className="mt-4 d-flex gap-3">

    <button
        className="btn btn-primary"
        onClick={() => navigate("/admin/menu")}
    >
        Manage Menu
    </button>

    <button
        className="btn btn-success"
        onClick={() => navigate("/reports")}
    >
        Sales Reports
    </button>

</div>

</div>

        <h2>Admin Dashboard</h2>

        {orders.map(order => (

    <div
        key={order.id}
        className="card mb-3"
    >

        <div className="card-body">

            <div className="d-flex justify-content-between align-items-center">

                <h4>Order #{order.id}</h4>

                <span className={`badge ${getStatusBadge(order.status)}`}>
                    {order.status}
                </span>

            </div>

            <p className="mt-2 mb-1">
                <strong>Customer:</strong> {order.customerName}
            </p>

            <p className="mb-3">
                <strong>Total:</strong> {order.totalPrice} SR
            </p>

            <button
                className="btn btn-primary btn-sm"
                onClick={() => openOrderDetails(order)}
            >
                View Details
            </button>

        </div>

    </div>

))}

{showOrderModal && selectedOrder && (

<div
    className="modal fade show d-block"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
>

    <div className="modal-dialog modal-lg">

        <div className="modal-content">

            <div className="modal-header">

                <h5 className="modal-title">
                    Order #{selectedOrder.id}
                </h5>

                <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowOrderModal(false)}
                ></button>

            </div>

            <div className="modal-body">

                <p>
                    <strong>Customer:</strong> {selectedOrder.customerName}
                </p>

                <p>
                    <strong>Phone:</strong> {selectedOrder.customerPhone}
                </p>
				
				<p>
				    <strong>Order Date:</strong>{" "}
				    {new Date(selectedOrder.orderDate).toLocaleString()}
				</p>

				<p>
				    <strong>📍 Address:</strong>{" "}
				    {selectedOrder.addressLabel}
				</p>

				<p>
				    <strong>Description:</strong>{" "}
				    {selectedOrder.addressDescription}
				</p>

{selectedOrder.latitude !== null &&
 selectedOrder.longitude !== null && (

    <div className="mt-3">

        <a
            href={`https://www.google.com/maps?q=${selectedOrder.latitude},${selectedOrder.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary"
        >
            📍 View Customer Location
        </a>

    </div>

)}

<p>
    <strong>Payment Method:</strong>{" "} {selectedOrder.paymentMethod === "CASH"
        ? "💵 Cash"
        : "💳 Credit Card"}
</p>

                <hr />

                <h5>Order Items</h5>

                <ul className="list-group mb-3">

                    {selectedOrder.items.map((item, index) => (

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

                <h4 className="text-success">
                    Total: {selectedOrder.totalPrice} SR
                </h4>

		{selectedOrder.customerNote && (

    		<div className="alert alert-warning mt-3">

        		<h5>📝 Customer Note</h5>

        		<p className="mb-0">
            		{selectedOrder.customerNote}
        		</p>

    		</div>

		)}

                {selectedOrder.rejectionReason && (

                    <div className="alert alert-danger mt-3">

                        <strong>Reason:</strong> {selectedOrder.rejectionReason}

                    </div>

                )}

            </div>

            <div className="modal-footer">

    {selectedOrder.status === "PENDING" && (
        <>
            <button
                className="btn btn-success"
                onClick={() => acceptOrder(selectedOrder.id)}
            >
                Accept
            </button>

            <button
                className="btn btn-danger"
                onClick={() => rejectOrder(selectedOrder.id)}
            >
                Reject
            </button>
        </>
    )}

    {selectedOrder.status === "ACCEPTED" && (
        <button
            className="btn btn-primary"
            onClick={() => preparingOrder(selectedOrder.id)}
        >
            Preparing
        </button>
    )}

    {selectedOrder.status === "PREPARING" && (
        <button
            className="btn btn-info"
            onClick={() => readyOrder(selectedOrder.id)}
        >
            Ready
        </button>
    )}

    {selectedOrder.status === "READY" && (
        <button
            className="btn btn-dark"
            onClick={() => deliveredOrder(selectedOrder.id)}
        >
            Delivered
        </button>
    )}

    <button
        className="btn btn-secondary"
        onClick={() => setShowOrderModal(false)}
    >
        Close
    </button>

</div>

        </div>

    </div>

</div>

)}


        

    </div>

);


}

export default Dashboard;