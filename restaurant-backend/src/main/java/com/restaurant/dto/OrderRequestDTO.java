package com.restaurant.dto;

import java.util.List;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import com.restaurant.enums.PaymentMethod;

public class OrderRequestDTO {


	@NotEmpty(message = "Order must contain at least one item")
	@Valid
	private List<OrderItemRequestDTO> items;
	
	private Long userId;
	
	private String customerNote;
	
	private PaymentMethod paymentMethod;
	
	private Double latitude;

	private Double longitude;
	
	private String addressDescription;
	
	private String addressLabel;

    public OrderRequestDTO() {
    }

    
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<OrderItemRequestDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequestDTO> items) {
        this.items = items;
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
    
}