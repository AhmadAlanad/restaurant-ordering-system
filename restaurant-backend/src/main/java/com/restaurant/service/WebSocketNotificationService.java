package com.restaurant.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.restaurant.dto.NotificationResponseDTO;
import com.restaurant.entity.Notification;

@Service
public class WebSocketNotificationService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendNewOrderNotification(Notification notification) {

        NotificationResponseDTO dto =
                new NotificationResponseDTO();

        dto.setId(notification.getId());
        dto.setMessage(notification.getMessage());
        dto.setType(notification.getType());
        dto.setOrderId(notification.getOrderId());
        dto.setRead(notification.isRead());
        dto.setCreatedAt(notification.getCreatedAt());

        messagingTemplate.convertAndSend(
                "/topic/new-orders",
                dto
        );
    }
}
