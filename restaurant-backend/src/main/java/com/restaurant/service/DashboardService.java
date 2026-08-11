package com.restaurant.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import com.restaurant.dto.DashboardDTO;
import com.restaurant.entity.Order;
import com.restaurant.enums.OrderStatus;
import com.restaurant.repository.OrderRepository;

@Service
public class DashboardService {

    @Autowired
    private OrderRepository orderRepository;
    
       
    public DashboardDTO getDashboard() {

        DashboardDTO dashboard = new DashboardDTO();

        dashboard.setTotalOrders(orderRepository.count());

        dashboard.setPendingOrders(
                orderRepository.countByStatus(OrderStatus.PENDING));

        
        List<Order> acceptedOrders =
                orderRepository.findByStatus(OrderStatus.ACCEPTED);
        
        

        LocalDate today = LocalDate.now();
        long todayOrders = 0;

        for (Order order : acceptedOrders) {

            if (order.getOrderDate() != null &&
                order.getOrderDate().toLocalDate().equals(today)) {

                
                
                if (order.getOrderDate() != null &&
                	    order.getOrderDate().toLocalDate().equals(today)) {

                	    todayOrders++;

                	}

            }

        }
        
      
        
        dashboard.setTodayOrders(todayOrders);

        return dashboard;
    }

}