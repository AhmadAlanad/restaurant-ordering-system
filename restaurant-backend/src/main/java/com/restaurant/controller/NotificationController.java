package com.restaurant.controller;

import java.util.List;

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
            @PathVariable Long id) {

        notificationService.markAsRead(id);
    }
}