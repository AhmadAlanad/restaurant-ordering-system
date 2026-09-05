import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "@stomp/stompjs";

import {
	getNotifications,
	markNotificationAsRead,
	markAllNotificationsAsRead
} from "../services/notificationService";

import "../styles/notifications.css";

function Notifications() {

	const navigate = useNavigate();

	const [notifications, setNotifications] = useState([]);

	const [loading, setLoading] = useState(true);

	const [popupNotifications, setPopupNotifications] = useState([]);

	const initializedRef = useRef(false);

	const notificationAudio = useRef(null);

	const stompClientRef = useRef(null);

	const knownNotificationIdsRef = useRef(new Set());


	/*
	 * Load notifications from backend
	 */
	const loadNotifications = async () => {

		try {

			const data = await getNotifications();

			/*
			 * First load:
			 * Remember existing notifications,
			 * but do not show old notifications as popups.
			 */
			if (!initializedRef.current) {

				knownNotificationIdsRef.current = new Set(
					data.map(notification => notification.id)
				);

				initializedRef.current = true;

				setNotifications(data);

				return;
			}


			/*
			 * Remember all notifications we have now seen.
			 */
			data.forEach(notification =>
				knownNotificationIdsRef.current.add(
					notification.id
				)
			);


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


	/*
	 * Initialize notification sound
	 */
	useEffect(() => {

		notificationAudio.current = new Audio(
			"/sounds/new-order.mp3"
		);

		notificationAudio.current.loop = true;


		return () => {

			notificationAudio.current?.pause();

			notificationAudio.current = null;

		};

	}, []);


	/*
	 * Unlock audio after the first user interaction
	 */
	useEffect(() => {

		const unlockAudio = () => {

			if (!notificationAudio.current) {
				return;
			}

			notificationAudio.current
				.play()
				.then(() => {

					notificationAudio.current.pause();

					notificationAudio.current.currentTime = 0;

				})
				.catch(() => {
					// Browser may still block audio
					// until the user interacts.
				});

		};


		document.addEventListener(
			"click",
			unlockAudio,
			{ once: true }
		);


		return () => {

			document.removeEventListener(
				"click",
				unlockAudio
			);

		};

	}, []);


	/*
	 * WebSocket connection
	 */
	useEffect(() => {

		const storedUser = JSON.parse(
			localStorage.getItem("user")
		);

		if (storedUser?.role !== "ADMIN") {

			return;

		}

		const client = new Client({
			brokerURL: "ws://localhost:8081/ws",
			reconnectDelay: 5000,

			connectHeaders: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},


			onConnect: () => {

				console.log(
					"WebSocket connected"
				);


				client.subscribe(
					"/topic/new-orders",
					(message) => {

						const notification =
							JSON.parse(message.body);

						if (
							notification.type === "NEW_ORDER" ||
							notification.type === "ORDER_REMINDER"
						) {


							/*
							 * Add notification to
							 * notification list if it
							 * does not already exist.
							 */
							setNotifications(
								prev => {

									if (
										prev.some(
											item =>
												item.id ===
												notification.id
										)
									) {

										return prev;

									}


									return [
										notification,
										...prev
									];

								}
							);


							/*
							 * Add a new popup.
							 *
							 * Each order gets its
							 * own popup.
							 */
							setPopupNotifications(
								prev => {

									/*
									 * Prevent duplicate
									 * popups for the same
									 * notification.
									 */
									if (
										prev.some(
											item =>
												item.id ===
												notification.id
										)
									) {

										return prev;

									}


									return [
										...prev,
										notification
									];

								}
							);


							/*
							 * Start notification sound.
							 */
							notificationAudio.current
								?.play()
								.catch(error => {

									console.log(
										"Notification sound could not play:",
										error
									);

								});

						}

					}
				);

			},


			onStompError: (frame) => {

				console.error(
					"WebSocket error:",
					frame.headers["message"]
				);

				console.error(
					"WebSocket error details:",
					frame.body
				);
			},


			onWebSocketError: (error) => {

				console.error(
					"WebSocket connection error:",
					error
				);

			}

		});


		stompClientRef.current = client;

		client.activate();


		return () => {

			client.deactivate();

			stompClientRef.current = null;

		};

	}, []);


	/*
	 * Initial notification load
	 * + fallback polling every 10 seconds
	 */
	useEffect(() => {

		loadNotifications();


		const interval = setInterval(
			loadNotifications,
			10000
		);


		return () => clearInterval(interval);

	}, []);


	/*
	 * Handle notification from
	 * notification dropdown
	 */
	const handleRead = async (notification) => {

		try {

			if (!notification.read) {

				await markNotificationAsRead(
					notification.id
				);


				setNotifications(prev =>
					prev.map(item =>
						item.id === notification.id
							? {
								...item,
								read: true
							}
							: item
					)
				);

			}



			if (
				notification.orderId &&
				(
					notification.type === "NEW_ORDER" ||
					notification.type === "ORDER_STATUS" ||
					notification.type === "ORDER_REMINDER"
				)
			) {
				navigate(
					`/dashboard?orderId=${notification.orderId}`
				);
			}



		} catch (error) {

			console.error(
				"Failed to handle notification:",
				error
			);

		}

	};


	/*
	 * Handle View Order button
	 */
	const handlePopupClick = async (notification) => {

		if (!notification) {
			return;
		}


		await handleRead(notification);


		setPopupNotifications(prev => {

			const remainingPopups = prev.filter(
				item =>
					item.id !== notification.id
			);


			/*
			 * Stop sound only when
			 * there are no popups left.
			 */
			if (remainingPopups.length === 0) {

				notificationAudio.current?.pause();

				if (notificationAudio.current) {
					notificationAudio.current.currentTime = 0;
				}

			}


			return remainingPopups;

		});

	};


	/*
	 * Mark all notifications as read
	 */
	const handleMarkAllAsRead = async () => {

		try {

			await markAllNotificationsAsRead();


			setNotifications(prev =>
				prev.map(notification => ({
					...notification,
					read: true
				}))
			);

		} catch (error) {

			console.error(
				"Failed to mark all notifications as read:",
				error
			);

		}

	};


	/*
	 * Remove popup when the order status
	 * changes from the dashboard.
	 */
	useEffect(() => {

		const handleOrderStatusChanged = (event) => {

			const {
				orderId,
				status
			} = event.detail;


			if (
				!orderId ||
				status === "PENDING"
			) {
				return;
			}


			setPopupNotifications(prev => {

				const remainingPopups = prev.filter(
					notification =>
						notification.orderId !== orderId
				);

				/*
				 * Stop sound only when
				 * there are no remaining popups.
				 */
				if (remainingPopups.length === 0) {

					notificationAudio.current?.pause();

					if (notificationAudio.current) {
						notificationAudio.current.currentTime = 0;
					}

				}


				return remainingPopups;

			});

		};


		window.addEventListener(
			"orderStatusChanged",
			handleOrderStatusChanged
		);


		return () => {

			window.removeEventListener(
				"orderStatusChanged",
				handleOrderStatusChanged
			);

		};

	}, []);


	/*
	 * Count unread notifications
	 */
	const unreadCount =
		notifications.filter(
			notification => !notification.read
		).length;


	/*
	 * Loading
	 */
	if (loading) {

		return (
			<div className="notification-loading">
				🔔
			</div>
		);

	}


	return (

		<>

			{/* Notification Bell */}

			<div className="dropdown notification-container">

				<button
					className="notification-bell"
					type="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
					title="Notifications"
				>

					🔔


					{unreadCount > 0 && (

						<span className="notification-badge">

							{unreadCount > 99
								? "99+"
								: unreadCount}

						</span>

					)}

				</button>


				{/* Notification Dropdown */}

				<ul className="dropdown-menu dropdown-menu-end notification-dropdown-menu">

					<li className="notification-dropdown-header">

						<strong>
							Notifications
						</strong>


						{unreadCount > 0 && (

							<button
								className="notification-mark-all"
								onClick={handleMarkAllAsRead}
							>
								Mark all as read
							</button>

						)}

					</li>


					<li>

						<hr className="dropdown-divider" />

					</li>


					{notifications.length === 0 ? (

						<li>

							<div className="notification-empty">

								<div className="notification-empty-icon">
									🔔
								</div>

								<span>
									No notifications
								</span>

							</div>

						</li>

					) : (

						notifications.map(notification => (

							<li
								key={notification.id}
							>

								<button
									className={`notification-item ${!notification.read
										? "notification-unread"
										: ""
										}`}
									onClick={() =>
										handleRead(notification)
									}
								>

									<div className="notification-item-icon">

										{notification.type === "NEW_ORDER"
											? "🛎️"
											: "📋"}

									</div>


									<div className="notification-item-content">

										<div className="notification-message">

											{notification.message}

										</div>


										<small className="notification-date">

											{new Date(
												notification.createdAt
											).toLocaleString()}

										</small>

									</div>


									{!notification.read && (

										<span className="notification-unread-dot"></span>

									)}

								</button>

							</li>

						))

					)}

				</ul>

			</div>


			{/* Multiple New Order Popups */}

			{popupNotifications.length > 0 && (

				<div className="new-order-popups-container">

					{popupNotifications.map(
						notification => (

							<div
								className="new-order-popup"
								key={notification.id}
								onClick={(event) => {

									event.stopPropagation();

									handlePopupClick(notification);

								}}
								role="button"
								tabIndex={0}
							>

								<div className="new-order-popup-content">

									<div>

										<strong>
											{notification.type === "ORDER_REMINDER"
												? "⏰ Order Still Waiting!"
												: "🛎️ New Order Received!"}
										</strong>


										<p>
											{notification.message}
										</p>

									</div>


									<button
										className="btn btn-primary btn-sm"
										onClick={() =>
											handlePopupClick(
												notification
											)
										}
									>
										View Order
									</button>


									<button
										className="btn-close"
										onClick={(event) => {

											event.stopPropagation();

											setPopupNotifications(
												prev => {

													const remainingPopups =
														prev.filter(
															item =>
																item.id !==
																notification.id
														);


													/*
													 * Stop sound only
													 * when this was
													 * the last popup.
													 */
													if (
														remainingPopups.length === 0
													) {

														notificationAudio.current?.pause();

														if (
															notificationAudio.current
														) {

															notificationAudio.current.currentTime = 0;

														}

													}


													return remainingPopups;

												}
											);

										}}
									></button>

								</div>

							</div>

						)
					)}

				</div>

			)}

		</>

	);

}

export default Notifications;
