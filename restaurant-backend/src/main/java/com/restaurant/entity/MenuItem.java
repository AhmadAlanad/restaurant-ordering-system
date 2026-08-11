package com.restaurant.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Menu item name is required")
    private String name;

    private String description;

    @Positive(message = "Price must be greater than zero")
    private double price;
    
    private String imageUrl;

    private boolean available;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    
    @OneToMany(
            mappedBy = "menuItem",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonManagedReference
    private List<MenuItemOption> options;

    public MenuItem() {
    }

    public MenuItem(Long id, String name, String description, double price, String imageUrl, boolean available, Category category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.available = available;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
    
    public List<MenuItemOption> getOptions() {
        return options;
    }
    
    public void setOptions(List<MenuItemOption> options) {
        this.options = options;
    }
    
}