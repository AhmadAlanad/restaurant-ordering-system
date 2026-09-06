package com.restaurant.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.UUID;
import org.hibernate.annotations.SQLRestriction;

@Entity
public class MenuItem {

	@Id
	@GeneratedValue
	private UUID id;

    @NotBlank(message = "Menu item name is required")
    private String name;

    private String description;

    @Positive(message = "Price must be greater than zero")
    private double price;
    
    private String imageUrl;

    private boolean available;
    private Integer displayOrder;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    
    
    @OneToMany(
            mappedBy = "menuItem",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OrderBy("createdAt ASC")
    @SQLRestriction("available = true")
    @JsonManagedReference
    private List<MenuItemOption> options;
    

    public MenuItem() {
    }

    public MenuItem(UUID id, String name, String description, double price, String imageUrl, boolean available, Category category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.available = available;
        this.category = category;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
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

    public Integer getDisplayOrder() {
    return displayOrder;
}

public void setDisplayOrder(Integer displayOrder) {
    this.displayOrder = displayOrder;
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