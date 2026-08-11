package com.restaurant.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import com.restaurant.entity.MenuItem;
import com.restaurant.dto.OrderRequestDTO;
import com.restaurant.entity.Order;
import com.restaurant.entity.OrderItem;
import com.restaurant.enums.OrderStatus;
import com.restaurant.repository.MenuItemRepository;
import com.restaurant.repository.OrderRepository;
import com.restaurant.dto.RejectOrderDTO;
import com.restaurant.exception.ResourceNotFoundException;
import com.restaurant.entity.User;
import com.restaurant.repository.UserRepository;
import java.time.LocalDateTime;
import com.restaurant.repository.MenuItemOptionRepository;
import com.restaurant.entity.MenuItemOption;

@Service
public class OrderService {
	
	public Order placeOrder(OrderRequestDTO request) {
		
		
		User user = userRepository.findById(request.getUserId())
	            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

	    Order order = new Order();
	    
	    order.setUser(user);
	    order.setCustomerName(user.getFullName());
	    order.setCustomerPhone(user.getPhone());
	    order.setLatitude(request.getLatitude());
	    order.setLongitude(request.getLongitude());
	    order.setCustomerNote(request.getCustomerNote());
	    order.setAddressDescription( request.getAddressDescription());
	    order.setPaymentMethod(request.getPaymentMethod());
	    

	    

	    order.setStatus(OrderStatus.PENDING);
	    
	    order.setOrderDate(LocalDateTime.now());
	    
	    List<OrderItem> orderItems = new ArrayList<>();
	    double totalPrice = 0;
	    
	    for (var itemRequest : request.getItems()) {
	    	MenuItem menuItem = menuItemRepository.findById(itemRequest.getMenuItemId())
	    			.orElseThrow(() -> new ResourceNotFoundException("Menu item not found"));
	    	
	    	MenuItemOption option = optionRepository.findById(
	    	        itemRequest.getOptionId())
	    	        .orElseThrow(() ->
	    	                new ResourceNotFoundException("Option not found"));
	    	
	    	if (!option.getMenuItem().getId().equals(menuItem.getId())) {
	    	    throw new ResourceNotFoundException(
	    	            "Selected option does not belong to this menu item");
	    	}
	    	
	    	OrderItem orderItem = new OrderItem();

	    	orderItem.setMenuItem(menuItem);
	    	orderItem.setOption(option);
	    	orderItem.setQuantity(itemRequest.getQuantity());

	    	orderItem.setPrice(option.getPrice());

	    	orderItem.setOrder(order);
	    	
	    	totalPrice += option.getPrice() * itemRequest.getQuantity();
	    	
	    	orderItems.add(orderItem);

	    }
	    
	    order.setOrderItems(orderItems);
	    order.setTotalPrice(totalPrice);

	    return orderRepository.save(order);

	   
	}
	
	public Order getOrderById(Long id) {

	    return orderRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Order not found"));

	}
	
	public List<Order> getAllOrders() {

	    return orderRepository.findAllByOrderByIdDesc();

	}
	
	public Order acceptOrder(Long id) {

	    Order order = orderRepository.findById(id)
	    		.orElseThrow(() -> new ResourceNotFoundException("Order not found"));

	    order.setStatus(OrderStatus.ACCEPTED);

	    return orderRepository.save(order);
	}
	
	public Order rejectOrder(Long id, RejectOrderDTO rejectRequest) {

	    Order order = orderRepository.findById(id)
	    		.orElseThrow(() -> new ResourceNotFoundException("Order not found"));

	    order.setStatus(OrderStatus.REJECTED);
	    order.setRejectionReason(rejectRequest.getReason());

	    return orderRepository.save(order);
	}
	
	public Order preparingOrder(Long id) {

	    Order order = orderRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Order not found"));

	    order.setStatus(OrderStatus.PREPARING);

	    return orderRepository.save(order);
	}
	
	public Order readyOrder(Long id) {

	    Order order = orderRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Order not found"));

	    order.setStatus(OrderStatus.READY);

	    return orderRepository.save(order);
	}
	
	public Order deliveredOrder(Long id) {

	    Order order = orderRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Order not found"));

	    order.setStatus(OrderStatus.DELIVERED);

	    return orderRepository.save(order);
	}
	
	public List<Order> getOrdersByUser(Long userId) {

	    return orderRepository.findByUserId(userId);

	}

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;
    
    @Autowired
    private MenuItemOptionRepository optionRepository;
    
    @Autowired
    private UserRepository userRepository;

}