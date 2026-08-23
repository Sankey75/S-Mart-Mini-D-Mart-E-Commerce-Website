package com.dmart.controller;

import com.dmart.dto.OrderRequestDto;
import com.dmart.dto.OrderResponseDto;
import com.dmart.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponseDto> createOrder(Authentication authentication, @RequestBody OrderRequestDto request) {
        String email = authentication.getName();
        return ResponseEntity.ok(orderService.createOrder(email, request));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDto>> getUserOrders(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(orderService.getUserOrders(email));
    }
}
