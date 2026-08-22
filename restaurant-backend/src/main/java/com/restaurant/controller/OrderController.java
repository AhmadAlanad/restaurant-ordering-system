package com.restaurant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.restaurant.dto.OrderRequestDTO;
import com.restaurant.dto.OrderResponseDTO;
import com.restaurant.dto.RejectOrderDTO;

import com.restaurant.mapper.OrderMapper;
import com.restaurant.service.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public OrderResponseDTO placeOrder(
            @Valid @RequestBody OrderRequestDTO request) {

        return OrderMapper.toDTO(
                orderService.placeOrder(request)
        );
    }

    @GetMapping
    public List<OrderResponseDTO> getAllOrders() {

        return orderService.getAllOrders()
                .stream()
                .map(OrderMapper::toDTO)
                .toList();
    }

    @GetMapping("/{id}")
    public OrderResponseDTO getOrderById(
            @PathVariable Long id) {

        return OrderMapper.toDTO(
                orderService.getOrderById(id)
        );
    }

    @GetMapping("/user/{userId}")
    public List<OrderResponseDTO> getOrdersByUser(
            @PathVariable Long userId) {

        return orderService.getOrdersByUser(userId)
                .stream()
                .map(OrderMapper::toDTO)
                .toList();
    }

    @PutMapping("/{id}/accept")
    public OrderResponseDTO acceptOrder(
            @PathVariable Long id) {

        return OrderMapper.toDTO(
                orderService.acceptOrder(id)
        );
    }

    @PutMapping("/{id}/reject")
    public OrderResponseDTO rejectOrder(
            @PathVariable Long id,
            @RequestBody RejectOrderDTO rejectRequest) {

        return OrderMapper.toDTO(
                orderService.rejectOrder(id, rejectRequest)
        );
    }

    @PutMapping("/{id}/preparing")
    public OrderResponseDTO preparingOrder(
            @PathVariable Long id) {

        return OrderMapper.toDTO(
                orderService.preparingOrder(id)
        );
    }

    @PutMapping("/{id}/ready")
    public OrderResponseDTO readyOrder(
            @PathVariable Long id) {

        return OrderMapper.toDTO(
                orderService.readyOrder(id)
        );
    }

    @PutMapping("/{id}/delivered")
    public OrderResponseDTO deliveredOrder(
            @PathVariable Long id) {

        return OrderMapper.toDTO(
                orderService.deliveredOrder(id)
        );
    }
}