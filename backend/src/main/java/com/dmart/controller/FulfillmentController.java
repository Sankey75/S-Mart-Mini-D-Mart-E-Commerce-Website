package com.dmart.controller;

import com.dmart.dto.OrderResponseDto;
import com.dmart.entity.Order;
import com.dmart.enums.OrderStatus;
import com.dmart.service.FulfillmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fulfillment")
@PreAuthorize("hasAnyRole('STAFF', 'MANAGER', 'ADMIN')")
public class FulfillmentController {
    private final FulfillmentService fulfillmentService;

    public FulfillmentController(FulfillmentService fulfillmentService) {
        this.fulfillmentService = fulfillmentService;
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponseDto>> getAllOrders(@RequestParam(required = false) OrderStatus status) {
        if (status != null) {
            return ResponseEntity.ok(fulfillmentService.getOrdersByStatus(status));
        }
        return ResponseEntity.ok(fulfillmentService.getAllOrders());
    }

    @PutMapping("/orders/{orderId}/status")
    public ResponseEntity<OrderResponseDto> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam OrderStatus status) {
        return ResponseEntity.ok(fulfillmentService.updateOrderStatus(orderId, status));
    }
}
