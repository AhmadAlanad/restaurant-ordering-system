package com.restaurant.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "restaurant_settings")
public class RestaurantSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private java.util.UUID id;

    @Column(nullable = false)
    private boolean open = true;

    public RestaurantSettings() {
    }

    public java.util.UUID getId() {
        return id;
    }

    public void setId(java.util.UUID id) {
        this.id = id;
    }

    public boolean isOpen() {
        return open;
    }

    public void setOpen(boolean open) {
        this.open = open;
    }
}