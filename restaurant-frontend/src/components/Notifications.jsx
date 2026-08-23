import { useEffect, useState } from "react";

import {
    getNotifications,
    markNotificationAsRead
} from "../services/notificationService";

import "../styles/notifications.css";

function Notifications() {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadNotifications = async () => {

        try {

            const data = await getNotifications();

            setNotifications(data);

        } catch (error) {

            console.error(
                "Failed to load notifications:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        loadNotifications();

        // Check for new notifications every 10 seconds.
        const interval = setInterval(
            loadNotifications,
            10000
        );

        return () => clearInterval(interval);

    }, []);

    const handleRead = async (id) => {

        try {

            await markNotificationAsRead(id);

            setNotifications(prev =>
                prev.map(notification =>
                    notification.id === id
                        ? {
                            ...notification,
                            read: true
                        }
                        : notification
                )
            );

        } catch (error) {

            console.error(
                "Failed to mark notification as read:",
                error
            );

        }
    };

    const unreadCount =
        notifications.filter(
            notification => !notification.read
        ).length;

    if (loading) {

        return (
            <div className="text-center mt-3">
                Loading notifications...
            </div>
        );

    }

    return (

        <div className="dropdown">

            <button
                className="btn btn-outline-dark position-relative"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                🔔 Notifications

                {unreadCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {unreadCount}
                    </span>
                )}

            </button>

            <ul className="dropdown-menu dropdown-menu-end notification-dropdown-menu">

                {notifications.length === 0 ? (

                    <li>
                        <span className="dropdown-item text-muted">
                            No notifications
                        </span>
                    </li>

                ) : (

                    notifications.map(notification => (

                        <li key={notification.id}>

                            <button
                                className={`dropdown-item ${
                                    !notification.read
                                        ? "bg-light"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleRead(
                                        notification.id
                                    )
                                }
                            >

                                <div className="fw-bold notification-message">
                                    {notification.message}
                                </div>

                                <small className="text-muted notification-date">
                                    {new Date(
                                        notification.createdAt
                                    ).toLocaleString()}
                                </small>

                            </button>

                        </li>

                    ))

                )}

            </ul>

        </div>

    );
}

export default Notifications;