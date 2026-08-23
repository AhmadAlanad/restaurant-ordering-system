package com.restaurant.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.restaurant.entity.Notification;
import com.restaurant.entity.User;
import java.util.stream.Collectors;

import com.restaurant.dto.NotificationResponseDTO;
import com.restaurant.exception.ResourceNotFoundException;
import com.restaurant.repository.NotificationRepository;
import com.restaurant.repository.UserRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;


    public void createNotification(
            User user,
            String message,
            String type) {

        Notification notification = new Notification();

        notification.setUser(user);
        notification.setMessage(message);
        notification.setType(type);
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);
    }


    public List<NotificationResponseDTO> getMyNotifications() {

        User user = getAuthenticatedUser();

        return notificationRepository
                .findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }


    public List<NotificationResponseDTO> getMyUnreadNotifications() {

        User user = getAuthenticatedUser();

        return notificationRepository
                .findByUserIdAndIsReadFalseOrderByCreatedAtDesc(
                        user.getId())
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }


    public void markAsRead(Long notificationId) {

        User user = getAuthenticatedUser();

        Notification notification = notificationRepository
                .findById(notificationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Notification not found"));

        if (!notification.getUser().getId()
                .equals(user.getId())) {

            throw new org.springframework.security.access.AccessDeniedException(
                    "You cannot modify another user's notification");
        }

        notification.setRead(true);

        notificationRepository.save(notification);
    }


    private User getAuthenticatedUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Authenticated user not found"));
    }
    
    private NotificationResponseDTO toDTO(
            Notification notification) {

        NotificationResponseDTO dto =
                new NotificationResponseDTO();

        dto.setId(notification.getId());
        dto.setMessage(notification.getMessage());
        dto.setType(notification.getType());
        dto.setRead(notification.isRead());
        dto.setCreatedAt(notification.getCreatedAt());

        return dto;
    }
}