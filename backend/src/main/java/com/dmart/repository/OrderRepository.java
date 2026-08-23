package com.dmart.repository;

import com.dmart.entity.Order;
import com.dmart.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
    List<Order> findByOrderStatus(OrderStatus orderStatus);
}
