import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {

    const [orders, setOrders] = useState([]);
	const notificationAudio = useRef(null);
    const navigate = useNavigate();
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [dashboard, setDashboard] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    });
	
	
	
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

	        const updatedOrders = response.data;

	        setOrders(updatedOrders);

	        const hasPendingOrders =
	            updatedOrders.some(
	                (order) => order.status === "PENDING"
	            );

	        if (hasPendingOrders) {

	            notificationAudio.current?.play()
	                .catch((error) => {
	                    console.log(
	                        "Notification sound could not play:",
	                        error
	                    );
	                });

	        } else {

	            notificationAudio.current?.pause();

	            if (notificationAudio.current) {
	                notificationAudio.current.currentTime = 0;
	            }

	        }

	    } catch (error) {

	        console.error(error);

	    }

	};
	
	useEffect(() => {
		    notificationAudio.current = new Audio(
		        "/sounds/new-order.mp3"
		    );

		    notificationAudio.current.loop = true;

		    return () => {
		        notificationAudio.current.pause();
		        notificationAudio.current = null;
		    };
		}, []);

		useEffect(() => {

		    loadOrders();

		    loadDashboard();

		    const interval = setInterval(() => {

		        loadOrders();

		        loadDashboard();

		    }, 5000);

		    return () => clearInterval(interval);

		}, []);
		
		useEffect(() => {

		    if (showOrderModal) {

		        document.body.style.overflow = "hidden";

		    } else {

		        document.body.style.overflow = "auto";

		    }

		    return () => {

		        document.body.style.overflow = "auto";

		    };

		}, [showOrderModal]);


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

const printOrder = () => {

    const order = selectedOrder;

    if (!order) {
        return;
    }

    const printWindow = window.open(
        "",
        "_blank",
        "width=800,height=900"
    );

    if (!printWindow) {
        alert("Please allow pop-ups to print the order.");
        return;
    }

    const itemsHtml = order.items.map(item => `
        <tr>
            <td>${item.itemName}</td>
            <td style="text-align:center;">
                ${item.quantity}
            </td>
            <td style="text-align:right;">
                ${item.price} SR
            </td>
            <td style="text-align:right;">
                ${item.price * item.quantity} SR
            </td>
        </tr>
    `).join("");

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Order #${order.id}</title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    margin: 40px;
                    color: #222;
                }

                .header {
                    text-align: center;
                    margin-bottom: 30px;
                }

                .header h1 {
                    margin-bottom: 5px;
                }

                .order-info {
                    margin-bottom: 25px;
                }

                .order-info p {
                    margin: 6px 0;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 15px;
                }

                th,
                td {
                    border: 1px solid #ddd;
                    padding: 10px;
                }

                th {
                    background: #f2f2f2;
                }

                .total {
                    text-align: right;
                    font-size: 20px;
                    font-weight: bold;
                    margin-top: 20px;
                }

                .note {
                    margin-top: 25px;
                    padding: 15px;
                    border: 1px solid #ddd;
                    background: #fff8dc;
                }

                .rejection {
                    margin-top: 25px;
                    padding: 15px;
                    border: 1px solid #dc3545;
                    background: #ffe6e6;
                }

                .footer {
                    margin-top: 40px;
                    text-align: center;
                    font-size: 12px;
                    color: #777;
                }

                @media print {
                    body {
                        margin: 20px;
                    }
                }

            </style>
        </head>

        <body>

            <div class="header">
                <h1>🍽 Restaurant</h1>
                <h2>Order #${order.id.substring(0, 8)}</h2>
            </div>

            <div class="order-info">

                <p>
                    <strong>Customer:</strong>
                    ${order.customerName}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${order.customerPhone}
                </p>

                <p>
                    <strong>Order Date:</strong>
                    ${new Date(order.orderDate).toLocaleString()}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${order.addressLabel || "N/A"}
                </p>

                <p>
                    <strong>Description:</strong>
                    ${order.addressDescription || "N/A"}
                </p>

                <p>
                    <strong>Payment Method:</strong>
                    ${order.paymentMethod === "CASH"
                        ? "Cash"
                        : "Credit Card"}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${order.status}
                </p>

            </div>

            <h3>Order Items</h3>

            <table>

                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>

                <tbody>
                    ${itemsHtml}
                </tbody>

            </table>

            <div class="total">
                Total: ${order.totalPrice} SR
            </div>

            ${
                order.customerNote
                    ? `
                        <div class="note">
                            <strong>Customer Note:</strong>
                            <p>${order.customerNote}</p>
                        </div>
                    `
                    : ""
            }

            ${
                order.rejectionReason
                    ? `
                        <div class="rejection">
                            <strong>Rejection Reason:</strong>
                            <p>${order.rejectionReason}</p>
                        </div>
                    `
                    : ""
            }

            <div class="footer">
                Thank you for your order.
            </div>

        </body>
        </html>
    `);

    printWindow.document.close();

    printWindow.focus();

    printWindow.onload = () => {

        printWindow.print();

        printWindow.close();

    };
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
    <div className="container-fluid dashboard-page">

        {/* =========================
            Dashboard Header
        ========================= */}

        <div className="dashboard-header">

            <div>
                <h1 className="dashboard-title">
                    Admin Dashboard
                </h1>

                <p className="dashboard-subtitle">
                    Manage orders and monitor your restaurant
                </p>
            </div>

            <div className="d-flex gap-2">

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/admin/menu")}
                >
                    🍽️ Manage Menu
                </button>

                <button
                    className="btn btn-success"
                    onClick={() => navigate("/reports")}
                >
                    📊 Sales Reports
                </button>

            </div>

        </div>


        {/* =========================
            Statistics
        ========================= */}

        <div className="row g-4">

            <div className="col-md-6 col-lg-3">

                <div className="card dashboard-stat-card">

                    <div className="card-body">

                        <div className="dashboard-stat-label">
                            Total Orders
                        </div>

                        <h2 className="dashboard-stat-number">
                            {dashboard.totalOrders}
                        </h2>

                    </div>

                </div>

            </div>


            <div className="col-md-6 col-lg-3">

                <div className="card dashboard-stat-card">

                    <div className="card-body">

                        <div className="dashboard-stat-label">
                            Pending Orders
                        </div>

                        <h2 className="dashboard-stat-number text-warning">
                            {dashboard.pendingOrders}
                        </h2>

                    </div>

                </div>

            </div>


            <div className="col-md-6 col-lg-3">

                <div className="card dashboard-stat-card">

                    <div className="card-body">

                        <div className="dashboard-stat-label">
                            Orders Today
                        </div>

                        <h2 className="dashboard-stat-number text-info">
                            {dashboard.todayOrders}
                        </h2>

                    </div>

                </div>

            </div>


            <div className="col-md-6 col-lg-3">

                <div className="card dashboard-stat-card">

                    <div className="card-body">

                        <div className="dashboard-stat-label">
                            Current Status
                        </div>

                        <h2 className="dashboard-stat-number text-success">
                            Active
                        </h2>

                    </div>

                </div>

            </div>

        </div>


        {/* =========================
            Orders Section
        ========================= */}

        <div className="dashboard-orders-section">

            <h2 className="dashboard-orders-title">
                Recent Orders
            </h2>


			{orders.map(order => (
			    <div
			        key={order.id}
			        className="card dashboard-order-card"
			        onClick={() => openOrderDetails(order)}
			    >
			        <div className="card-body">

			            <div
			                className={`dashboard-order-header order-status-${order.status.toLowerCase()}`}
			            >
			                <div>
			                    <h4>
			                        Order #{order.id.substring(0, 8)}
			                    </h4>

			                    <small>
			                        {new Date(order.orderDate).toLocaleString()}
			                    </small>
			                </div>

			                <span
			                    className={`badge ${getStatusBadge(order.status)}`}
			                >
			                    {order.status}
			                </span>
			            </div>

			            <div className="dashboard-order-info">

			                <div>
			                    <span className="dashboard-order-label">
			                        Customer
			                    </span>

			                    <strong>
			                        👤 {order.customerName}
			                    </strong>
			                </div>

			                <div>
			                    <span className="dashboard-order-label">
			                        Phone
			                    </span>

			                    <strong>
			                        📞 {order.customerPhone}
			                    </strong>
			                </div>

			                <div>
			                    <span className="dashboard-order-label">
			                        Total
			                    </span>

			                    <strong className="dashboard-order-price">
			                        {order.totalPrice} SR
			                    </strong>
			                </div>

			            </div>

			        </div>
			    </div>
			))}
</div>


{showOrderModal && selectedOrder && (

    <div className="modal fade show d-block dashboard-modal">

        <div className="modal-dialog modal-lg modal-dialog-scrollable">

            <div className="modal-content">

                {/* Modal Header */}
                <div className="modal-header">

                    <div>
					<div className="d-flex align-items-center gap-2">

					    <h5 className="modal-title mb-0">

					        Order #{selectedOrder.id.substring(0, 8)}

					    </h5>

					    <span
					        className={`badge ${getStatusBadge(
					            selectedOrder.status
					        )}`}
					    >
					        {selectedOrder.status}
					    </span>

					</div>

                        <small className="text-muted">
                            {new Date(
                                selectedOrder.orderDate
                            ).toLocaleString()}
                        </small>
                    </div>

                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowOrderModal(false)}
                    ></button>

                </div>


                {/* Modal Body */}
                <div
                    className="modal-body"
                    id="print-order"
                >

				

				{/* Customer / Delivery / Payment Information */}

				<div className="dashboard-modal-compact-info">

				
				<div>

				    <span className="dashboard-modal-label">
				        Customer
				    </span>

				    <strong>
				        {selectedOrder.customerName}
				    </strong>

				</div>


				<div>

				    <span className="dashboard-modal-label">
				        Phone
				    </span>

				    <strong>
				        {selectedOrder.customerPhone}
				    </strong>

				</div>


				<div>

				    <span className="dashboard-modal-label">
				        Payment
				    </span>

				    <strong>
				        {selectedOrder.paymentMethod === "CASH"
				            ? "💵 Cash"
				            : "💳 Credit Card"}
				    </strong>

				</div>


				<div>

				    <span className="dashboard-modal-label">
				        Address
				    </span>

				    <strong>
				        {selectedOrder.addressLabel}
				    </strong>

				</div>


				<div className="dashboard-modal-address-description">

				    <span className="dashboard-modal-label">
				        Description
				    </span>

				    <strong>
				        {selectedOrder.addressDescription}
				    </strong>

				</div>
				

				</div>

				{/* Customer Location */}
				{selectedOrder.latitude !== null &&
				selectedOrder.longitude !== null && (

				
				    <div className="dashboard-modal-location">

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
				


                    {/* Order Items */}
                    <div className="dashboard-modal-section">

                        <h6 className="dashboard-modal-section-title">
                            🧾 Order Items
                        </h6>

                        <div className="dashboard-order-items">

						
						{selectedOrder.items.map((item, index) => (

						    <div
						        key={index}
						        className="dashboard-modal-item"
						    >

						        {/* Item Image */}
						        {item.imageUrl ? (

						            <img
						                src={`http://localhost:8081/images/${item.imageUrl}`}
						                alt={item.itemName}
						                className="dashboard-modal-item-image"
						            />

						        ) : (

						            <div className="dashboard-modal-item-image-placeholder">
						                🍽️
						            </div>

						        )}


						        {/* Item Information */}
						        <div className="dashboard-modal-item-details">

						            <strong>
						                {item.itemName}
						            </strong>

						            {item.optionName && (
						                <small>
						                    {item.optionName}
						                </small>
						            )}

						            <span>
						                Quantity: {item.quantity}
						            </span>

						        </div>


						        {/* Item Price */}
						        <strong className="dashboard-order-price">
						            {item.price * item.quantity} SR
						        </strong>

						    </div>

						))}
						

                        </div>


                        {/* Total */}
                        <div className="dashboard-modal-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                {selectedOrder.totalPrice} SR
                            </strong>

                        </div>

                    </div>


                    {/* Customer Note */}
                    {selectedOrder.customerNote && (

                        <div className="alert alert-warning dashboard-customer-note">

                            <h5>
                                📝 Customer Note
                            </h5>

                            <p className="mb-0">
                                {selectedOrder.customerNote}
                            </p>

                        </div>

                    )}


                    {/* Rejection Reason */}
                    {selectedOrder.rejectionReason && (

                        <div className="alert alert-danger dashboard-rejection-reason">

                            <h5>
                                ❌ Rejection Reason
                            </h5>

                            <p className="mb-0">
                                {selectedOrder.rejectionReason}
                            </p>

                        </div>

                    )}

                </div>


                
				{/* Modal Footer */}
				<div className="modal-footer">

				    <div className="dashboard-status-actions">

				        {/* Accept */}
				        <button
				            className="btn btn-success"
				            disabled={selectedOrder.status !== "PENDING"}
				            onClick={() =>
				                acceptOrder(selectedOrder.id)
				            }
				        >
				            ✓ Accept
				        </button>


				        {/* Reject */}
				        <button
				            className="btn btn-danger"
				            disabled={selectedOrder.status !== "PENDING"}
				            onClick={() =>
				                rejectOrder(selectedOrder.id)
				            }
				        >
				            ✕ Reject
				        </button>


				        {/* Preparing */}
				        <button
				            className="btn btn-primary"
				            disabled={selectedOrder.status !== "ACCEPTED"}
				            onClick={() =>
				                preparingOrder(selectedOrder.id)
				            }
				        >
				            🍳 Preparing
				        </button>


				        {/* Ready */}
				        <button
				            className="btn btn-info"
				            disabled={selectedOrder.status !== "PREPARING"}
				            onClick={() =>
				                readyOrder(selectedOrder.id)
				            }
				        >
				            ✓ Ready
				        </button>


				        {/* Delivered */}
				        <button
				            className="btn btn-dark"
				            disabled={selectedOrder.status !== "READY"}
				            onClick={() =>
				                deliveredOrder(selectedOrder.id)
				            }
				        >
				            🚚 Delivered
				        </button>

				    </div>


				    <div className="dashboard-secondary-actions">

				        {/* Print */}
				        <button
				            className="btn btn-outline-dark"
				            onClick={printOrder}
				        >
				            🖨️ Print Order
				        </button>


				        {/* Close */}
				        <button
				            className="btn btn-secondary"
				            onClick={() =>
				                setShowOrderModal(false)
				            }
				        >
				            Close
				        </button>

				    </div>

				</div>
				


            </div>

        </div>

    </div>

)}


        

    </div>

);


}

export default Dashboard;