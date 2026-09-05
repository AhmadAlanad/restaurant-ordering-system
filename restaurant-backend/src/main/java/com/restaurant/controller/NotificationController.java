package com.restaurant.controller;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.restaurant.dto.NotificationResponseDTO;
import com.restaurant.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;


    @GetMapping
    public List<NotificationResponseDTO> getMyNotifications() {

        return notificationService.getMyNotifications();
    }


    @GetMapping("/unread")
    public List<NotificationResponseDTO> getMyUnreadNotifications() {

        return notificationService.getMyUnreadNotifications();
    }


    @PutMapping("/{id}/read")
    public void markAsRead(
            @PathVariable UUID id) {

        notificationService.markAsRead(id);
    }
    
    @PutMapping("/read-all")
    public void markAllAsRead() {
        notificationService.markAllAsRead();
    }
}