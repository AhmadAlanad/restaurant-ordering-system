package com.restaurant.dto;

import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;
import com.restaurant.enums.OrderStatus;
import com.restaurant.enums.PaymentMethod;


public class OrderResponseDTO {

	private UUID id;

    private String customerName;

    private String customerPhone;
    
    private Double latitude;
    
    private Double longitude;
    
    private String addressDescription;
    
    private String addressLabel;

    private double totalPrice;
    
    private String customerNote;
    
    private PaymentMethod paymentMethod;

    private OrderStatus status;

    private String rejectionReason;

    private List<OrderItemResponseDTO> items;
    
    private LocalDateTime orderDate;

    public OrderResponseDTO() {
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
    
    public String getAddressDescription() {
        return addressDescription;
    }
    
    public void setAddressDescription(String addressDescription) {
        this.addressDescription = addressDescription;
    }
    
    public String getAddressLabel() {
        return addressLabel;
    }

    public void setAddressLabel(String addressLabel) {
        this.addressLabel = addressLabel;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
    
    public String getCustomerNote() {
        return customerNote;
    }

    public void setCustomerNote(String customerNote) {
        this.customerNote = customerNote;
    }
    
    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    
    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
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

    public List<OrderItemResponseDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemResponseDTO> items) {
        this.items = items;
    }
}