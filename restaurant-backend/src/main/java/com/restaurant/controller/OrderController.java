package com.restaurant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import com.restaurant.dto.OrderResponseDTO;
import com.restaurant.mapper.OrderMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.restaurant.dto.OrderRequestDTO;
import com.restaurant.entity.Order;
import com.restaurant.service.OrderService;
import com.restaurant.dto.RejectOrderDTO;
import jakarta.validation.Valid;
import java.util.ArrayList;


@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public OrderResponseDTO placeOrder(@Valid @RequestBody OrderRequestDTO request) {

        return OrderMapper.toDTO(orderService.placeOrder(request));

    }
    
    @GetMapping
    public List<OrderResponseDTO> getAllOrders() {

        List<OrderResponseDTO> response = new ArrayList<>();

        for (Order order : orderService.getAllOrders()) {
            response.add(OrderMapper.toDTO(order));
        }

        return response;
    }
    
    @PutMapping("/{id}/accept")
    public Order acceptOrder(@PathVariable Long id) {
        return orderService.acceptOrder(id);
    }
    
    @PutMapping("/{id}/reject")
    public Order rejectOrder(@PathVariable Long id,
                             @RequestBody RejectOrderDTO rejectRequest) {

        return orderService.rejectOrder(id, rejectRequest);
    }
    
    @PutMapping("/{id}/preparing")
    public Order preparingOrder(@PathVariable Long id) {
        return orderService.preparingOrder(id);
    }
    
    @PutMapping("/{id}/ready")
    public Order readyOrder(@PathVariable Long id) {
        return orderService.readyOrder(id);
    }
    
    @PutMapping("/{id}/delivered")
    public Order deliveredOrder(@PathVariable Long id) {
        return orderService.deliveredOrder(id);
    }
    
    @GetMapping("/user/{userId}")
    public List<OrderResponseDTO> getOrdersByUser(
            @PathVariable Long userId) {

        return orderService.getOrdersByUser(userId)
                .stream()
                .map(OrderMapper::toDTO)
                .toList();

    }
    
    @GetMapping("/{id}")
    public OrderResponseDTO getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        return OrderMapper.toDTO(order);
    }

}