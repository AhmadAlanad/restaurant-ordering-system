package com.restaurant.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.access.AccessDeniedException;

import com.restaurant.dto.OrderRequestDTO;
import com.restaurant.dto.RejectOrderDTO;
import com.restaurant.entity.MenuItem;
import com.restaurant.entity.MenuItemOption;
import com.restaurant.entity.Order;
import com.restaurant.entity.OrderItem;
import com.restaurant.entity.User;
import com.restaurant.enums.OrderStatus;
import com.restaurant.exception.ResourceNotFoundException;
import com.restaurant.repository.MenuItemOptionRepository;
import com.restaurant.repository.MenuItemRepository;
import com.restaurant.repository.OrderRepository;
import com.restaurant.repository.UserRepository;
import com.restaurant.entity.Notification;
import com.restaurant.enums.Role;
import com.restaurant.repository.NotificationRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private MenuItemOptionRepository optionRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private NotificationRepository notificationRepository;


    public Order placeOrder(OrderRequestDTO request) {

    	User user = getAuthenticatedUser();


        Order order = new Order();

        order.setUser(user);
        order.setCustomerName(user.getFullName());
        order.setCustomerPhone(user.getPhone());

        order.setLatitude(request.getLatitude());
        order.setLongitude(request.getLongitude());
        
        
        order.setAddressLabel(
                request.getAddressLabel()
        );
        order.setAddressDescription(
                request.getAddressDescription()
        );

        order.setCustomerNote(
                request.getCustomerNote()
        );

        order.setPaymentMethod(
                request.getPaymentMethod()
        );

        order.setStatus(OrderStatus.PENDING);

        order.setOrderDate(LocalDateTime.now());


        List<OrderItem> orderItems = new ArrayList<>();

        double totalPrice = 0;


        for (var itemRequest : request.getItems()) {

            MenuItem menuItem =
                    menuItemRepository.findById(
                            itemRequest.getMenuItemId()
                    )
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Menu item not found"
                            )
                    );


            MenuItemOption option = null;
            double itemPrice;

            if (itemRequest.getOptionId() != null) {

                option = optionRepository.findById(
                        itemRequest.getOptionId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Option not found"
                        )
                );

                // Make sure the selected option
                // belongs to the selected menu item.
                if (!option.getMenuItem().getId()
                        .equals(menuItem.getId())) {

                    throw new IllegalArgumentException(
                            "Selected option does not belong to this menu item"
                    );
                }

                // Use option price
                itemPrice = option.getPrice();

            } else {

                // Menu item has no option.
                // Use the menu item's normal price.
                itemPrice = menuItem.getPrice();
            }


            OrderItem orderItem = new OrderItem();

            orderItem.setMenuItem(menuItem);

            orderItem.setOption(option);

            orderItem.setQuantity(
                    itemRequest.getQuantity()
            );

            orderItem.setPrice(itemPrice);

            orderItem.setOrder(order);


            totalPrice +=
                    itemPrice *
                    itemRequest.getQuantity();


            orderItems.add(orderItem);
        }


        order.setOrderItems(orderItems);
        order.setTotalPrice(totalPrice);


        Order savedOrder = orderRepository.save(order);

        List<User> admins = userRepository.findByRole(Role.ADMIN);

        for (User admin : admins) {

            Notification notification = new Notification();

            notification.setUser(admin);

            notification.setMessage(
            	    "New order #" + savedOrder.getId().toString().substring(0, 8)
            	    + " received from "
            	    + savedOrder.getCustomerName()
            	);

            notification.setType("NEW_ORDER");

            notification.setRead(false);

            notification.setCreatedAt(LocalDateTime.now());

            notificationRepository.save(notification);
        }

        return savedOrder;
    }


    public Order getOrderById(UUID id) {

        User authenticatedUser = getAuthenticatedUser();

        Order order = findOrderById(id);

        if (authenticatedUser.getRole() != com.restaurant.enums.Role.ADMIN
                && !order.getUser().getId().equals(authenticatedUser.getId())) {

            throw new AccessDeniedException(
                    "You cannot access another user's order");
        }

        return order;
    }


    public List<Order> getAllOrders() {

        User authenticatedUser = getAuthenticatedUser();

        if (authenticatedUser.getRole() != com.restaurant.enums.Role.ADMIN) {

            throw new AccessDeniedException(
                    "Only administrators can view all orders");
        }

        return orderRepository.findAllByOrderByIdDesc();
    }


    public List<Order> getOrdersByUser(UUID userId) {

        User authenticatedUser = getAuthenticatedUser();

        if (authenticatedUser.getRole() != com.restaurant.enums.Role.ADMIN
                && !authenticatedUser.getId().equals(userId)) {

            throw new AccessDeniedException(
                    "You cannot access another user's orders");
        }

        return orderRepository.findByUserId(userId);
    }


    public Order acceptOrder(UUID id) {

        Order order = findOrderById(id);

        order.setStatus(OrderStatus.ACCEPTED);

        Order savedOrder = orderRepository.save(order);

        createOrderStatusNotification(
                savedOrder,
                "Your order #" + savedOrder.getId().toString().substring(0, 8)
                + " has been accepted."
        );

        return savedOrder;
    }


    public Order rejectOrder(
    		UUID id,
            RejectOrderDTO rejectRequest) {

        Order order = findOrderById(id);

        order.setStatus(OrderStatus.REJECTED);

        order.setRejectionReason(
                rejectRequest.getReason()
        );

        Order savedOrder = orderRepository.save(order);

        createOrderStatusNotification(
                savedOrder,
                "Your order #" + savedOrder.getId().toString().substring(0, 8)
                + " has been rejected. Reason: "
                + savedOrder.getRejectionReason()
        );

        return savedOrder;
    }


    public Order preparingOrder(UUID id) {

        Order order = findOrderById(id);

        order.setStatus(OrderStatus.PREPARING);

        Order savedOrder = orderRepository.save(order);

        createOrderStatusNotification(
                savedOrder,
                "Your order #" + savedOrder.getId().toString().substring(0, 8)
                + " is being prepared."
        );

        return savedOrder;
    }


    public Order readyOrder(UUID id) {

        Order order = findOrderById(id);

        order.setStatus(OrderStatus.READY);

        Order savedOrder = orderRepository.save(order);

        createOrderStatusNotification(
                savedOrder,
                "Your order #" + savedOrder.getId().toString().substring(0, 8)
                + " is ready for pickup/delivery."
        );

        return savedOrder;
    }


    public Order deliveredOrder(UUID id) {

        Order order = findOrderById(id);

        order.setStatus(OrderStatus.DELIVERED);

        Order savedOrder = orderRepository.save(order);

        createOrderStatusNotification(
                savedOrder,
                "Your order #" + savedOrder.getId().toString().substring(0, 8)
                + " has been delivered."
        );

        return savedOrder;
    }
    
    private User getAuthenticatedUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Authenticated user not found"));
    }


    private Order findOrderById(UUID id) {

        return orderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found"
                        )
                );
    }
    
    private void createOrderStatusNotification(
            Order order,
            String message) {

        Notification notification = new Notification();

        notification.setUser(order.getUser());
        notification.setMessage(message);
        notification.setType("ORDER_STATUS");
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);
    }
}