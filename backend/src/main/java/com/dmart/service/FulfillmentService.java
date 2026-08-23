package com.dmart.service;

import com.dmart.dto.OrderResponseDto;
import com.dmart.entity.Order;
import com.dmart.enums.OrderStatus;
import com.dmart.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FulfillmentService {
    private final OrderRepository orderRepository;

    public FulfillmentService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<OrderResponseDto> getOrdersByStatus(OrderStatus status) {
        return orderRepository.findAll().stream()
                .filter(order -> order.getOrderStatus() == status)
                .map(this::mapToDto)
                .toList();
    }

    public List<OrderResponseDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::mapToDto)
                .toList();
    }

    @Transactional
    public OrderResponseDto updateOrderStatus(Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));
        
        order.setOrderStatus(newStatus);
        return mapToDto(orderRepository.save(order));
    }

    private OrderResponseDto mapToDto(Order order) {
        OrderResponseDto dto = new OrderResponseDto();
        dto.setId(order.getId());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setSubtotal(order.getSubtotal());
        dto.setDeliveryFee(order.getDeliveryFee());
        dto.setDiscount(order.getDiscount());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setFulfillmentType(order.getFulfillmentType());
        dto.setPaymentStatus(order.getPaymentStatus());
        dto.setOrderStatus(order.getOrderStatus());
        dto.setScheduledDate(order.getScheduledDate());
        dto.setScheduledTime(order.getScheduledTime());
        dto.setCreatedAt(order.getCreatedAt());
        return dto;
    }
}
