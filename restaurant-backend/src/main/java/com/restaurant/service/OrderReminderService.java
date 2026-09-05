package com.restaurant.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.restaurant.entity.Notification;
import com.restaurant.entity.Order;
import com.restaurant.entity.User;
import com.restaurant.enums.OrderStatus;
import com.restaurant.repository.NotificationRepository;
import com.restaurant.repository.OrderRepository;
import com.restaurant.repository.UserRepository;

@Service
public class OrderReminderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WebSocketNotificationService webSocketNotificationService;


    @Scheduled(fixedRate = 5000)
    public void checkPendingOrders() {

        List<Order> pendingOrders =
                orderRepository.findByStatus(OrderStatus.PENDING);

        LocalDateTime now = LocalDateTime.now();

        for (Order order : pendingOrders) {

            if (order.getOrderDate() == null) {
                continue;
            }

            LocalDateTime reminderTime =
                    order.getOrderDate().plusSeconds(30);

            if (now.isBefore(reminderTime)) {
                continue;
            }

            sendReminderIfNeeded(order);
        }
    }


    private void sendReminderIfNeeded(Order order) {

        List<User> admins =
                userRepository.findByRole(
                        com.restaurant.enums.Role.ADMIN
                );

        for (User admin : admins) {

            boolean reminderAlreadySent =
                    notificationRepository
                        .existsByUserIdAndOrderIdAndType(
                            admin.getId(),
                            order.getId(),
                            "ORDER_REMINDER"
                        );

            if (reminderAlreadySent) {
                continue;
            }

            Notification notification =
                    new Notification();

            notification.setUser(admin);

            notification.setOrderId(order.getId());

            notification.setMessage(
                    "Reminder: Order #" +
                    order.getId()
                        .toString()
                        .substring(0, 8) +
                    " is still waiting for acceptance."
            );

            notification.setType("ORDER_REMINDER");

            notification.setRead(false);

            notification.setCreatedAt(
                    LocalDateTime.now()
            );

            notificationRepository.save(notification);

            webSocketNotificationService
                    .sendNewOrderNotification(
                            notification
                    );
        }
    }
}