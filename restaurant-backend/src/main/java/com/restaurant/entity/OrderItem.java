package com.restaurant.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
public class OrderItem {

	@Id
	@GeneratedValue
	private UUID id;

    private int quantity;

    private double price;

    @ManyToOne
    @JoinColumn(name = "menu_item_id")
    private MenuItem menuItem;
    
    @ManyToOne
    @JoinColumn(name = "option_id")
    private MenuItemOption option;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonBackReference
    private Order order;

    public OrderItem() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public MenuItem getMenuItem() {
		return menuItem;
	}

	public void setMenuItem(MenuItem menuItem) {
		this.menuItem = menuItem;
	}
	
	public MenuItemOption getOption() {
	    return option;
	}
	
	public void setOption(MenuItemOption option) {
	    this.option = option;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

    
}