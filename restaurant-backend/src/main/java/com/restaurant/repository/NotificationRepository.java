package com.restaurant.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurant.entity.Notification;

public interface NotificationRepository
        extends JpaRepository<Notification, UUID> {

    List<Notification> findByUserIdOrderByCreatedAtDesc(UUID userId);

    List<Notification> findByUserIdAndIsReadFalseOrderByCreatedAtDesc(
            UUID userId);
}