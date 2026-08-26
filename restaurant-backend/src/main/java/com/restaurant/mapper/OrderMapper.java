package com.restaurant.mapper;

import java.util.ArrayList;
import java.util.List;

import com.restaurant.dto.OrderItemResponseDTO;
import com.restaurant.dto.OrderResponseDTO;
import com.restaurant.entity.Order;
import com.restaurant.entity.OrderItem;

public class OrderMapper {

    public static OrderResponseDTO toDTO(Order order) {

        OrderResponseDTO dto = new OrderResponseDTO();

        dto.setId(order.getId());
        dto.setCustomerName(order.getCustomerName());
        dto.setCustomerPhone(order.getCustomerPhone());
        dto.setAddressLabel(order.getAddressLabel());
        dto.setAddressDescription(order.getAddressDescription());
        dto.setLatitude(order.getLatitude());
        dto.setLongitude(order.getLongitude());
        dto.setStatus(order.getStatus());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setCustomerNote(order.getCustomerNote());
        dto.setOrderDate(order.getOrderDate());
        dto.setRejectionReason(order.getRejectionReason());
        dto.setPaymentMethod(order.getPaymentMethod());

        List<OrderItemResponseDTO> items = new ArrayList<>();

        for (OrderItem orderItem : order.getOrderItems()) {

            OrderItemResponseDTO itemDTO = new OrderItemResponseDTO();

            itemDTO.setItemName(orderItem.getMenuItem().getName());

            if (orderItem.getOption() != null) {
                itemDTO.setOptionId(orderItem.getOption().getId());
                itemDTO.setOptionName(orderItem.getOption().getName());
            }

            itemDTO.setPrice(orderItem.getPrice());
            itemDTO.setQuantity(orderItem.getQuantity());

            items.add(itemDTO);
        }

        dto.setItems(items);

        return dto;
    }

}