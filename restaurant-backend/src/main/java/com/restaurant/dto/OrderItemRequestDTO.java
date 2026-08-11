package com.restaurant.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class OrderItemRequestDTO {

	@NotNull(message = "Menu item ID is required")
	private Long menuItemId;

	@NotNull(message = "Option ID is required")
	private Long optionId;

	@Min(value = 1, message = "Quantity must be at least 1")
	private int quantity;

    public OrderItemRequestDTO() {
    }

    public Long getMenuItemId() {
        return menuItemId;
    }

    public void setMenuItemId(Long menuItemId) {
        this.menuItemId = menuItemId;
    }
    
    public Long getOptionId() {
        return optionId;
    }
    
    public void setOptionId(Long optionId) {
        this.optionId = optionId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}