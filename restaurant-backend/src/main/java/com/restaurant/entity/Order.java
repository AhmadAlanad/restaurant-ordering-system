package com.restaurant.entity;

import java.util.List;
import java.util.UUID;
import com.restaurant.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.restaurant.enums.PaymentMethod;

@Entity
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue
	private UUID id;

    private String customerName;

    private String customerPhone;
    
    private String addressLabel;
    
    private String addressDescription;
    
    private Double latitude;

    private Double longitude;
    
    @Column(length = 500)
    private String customerNote;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    private String rejectionReason;

    private double totalPrice;
    
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;
    
    private LocalDateTime orderDate;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<OrderItem> orderItems;

    public Order() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustomerPhone() {
		return customerPhone;
	}

	public void setCustomerPhone(String customerPhone) {
		this.customerPhone = customerPhone;
	}
	
	public String getAddressLabel() {
	    return addressLabel;
	}

	public void setAddressLabel(String addressLabel) {
	    this.addressLabel = addressLabel;
	}
	
	public String getAddressDescription() {
	    return addressDescription;
	}

	public void setAddressDescription(String addressDescription) {
	    this.addressDescription = addressDescription;
	}
	
	public Double getLatitude() {
	    return latitude;
	}

	public void setLatitude(Double latitude) {
	    this.latitude = latitude;
	}

	public Double getLongitude() {
	    return longitude;
	}

	public void setLongitude(Double longitude) {
	    this.longitude = longitude;
	}
	
	public PaymentMethod getPaymentMethod() {
	    return paymentMethod;
	}

	public void setPaymentMethod(PaymentMethod paymentMethod) {
	    this.paymentMethod = paymentMethod;
	}
	
	public String getCustomerNote() {
	    return customerNote;
	}

	public void setCustomerNote(String customerNote) {
	    this.customerNote = customerNote;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public String getRejectionReason() {
		return rejectionReason;
	}

	public void setRejectionReason(String rejectionReason) {
		this.rejectionReason = rejectionReason;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	public LocalDateTime getOrderDate() {
	    return orderDate;
	}

	public void setOrderDate(LocalDateTime orderDate) {
	    this.orderDate = orderDate;
	}
	
	public User getUser() {
	    return user;
	}

	public void setUser(User user) {
	    this.user = user;
	}

	public List<OrderItem> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<OrderItem> orderItems) {
		this.orderItems = orderItems;
	}

    
}