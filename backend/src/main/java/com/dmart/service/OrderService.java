package com.dmart.service;

import com.dmart.dto.OrderItemResponseDto;
import com.dmart.dto.OrderRequestDto;
import com.dmart.dto.OrderResponseDto;
import com.dmart.entity.*;
import com.dmart.enums.FulfillmentType;
import com.dmart.enums.OrderStatus;
import com.dmart.enums.PaymentStatus;
import com.dmart.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final InventoryRepository inventoryRepository;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository,
                        CartRepository cartRepository, CartItemRepository cartItemRepository,
                        UserRepository userRepository, InventoryRepository inventoryRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.inventoryRepository = inventoryRepository;
    }

    @Transactional
    public OrderResponseDto createOrder(String email, OrderRequestDto request) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = cartRepository.findByUserId(user.getId()).orElseThrow(() -> new RuntimeException("Cart not found"));

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setOrderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setUser(user);
        order.setFulfillmentType(request.getFulfillmentType());
        order.setScheduledDate(request.getScheduledDate());
        order.setScheduledTime(request.getScheduledTime());
        order.setOrderStatus(OrderStatus.PLACED);
        order.setPaymentStatus(PaymentStatus.COMPLETED); // Mocking successful payment

        BigDecimal subtotal = BigDecimal.ZERO;
        
        // In a real app we'd fetch address using request.getAddressId()
        // order.setAddress(...)

        order = orderRepository.save(order);

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cart.getItems()) {
            Product product = cartItem.getProduct();
            
            // Check inventory (Mocking basic logic)
            Inventory inventory = inventoryRepository.findByProductId(product.getId())
                    .orElseThrow(() -> new RuntimeException("Inventory not found for product " + product.getName()));
            if (inventory.getAvailableQuantity() < cartItem.getQuantity()) {
                throw new RuntimeException("Insufficient stock for " + product.getName());
            }
            inventory.setAvailableQuantity(inventory.getAvailableQuantity() - cartItem.getQuantity());
            inventoryRepository.save(inventory);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(product.getPrice());
            
            subtotal = subtotal.add(product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
            orderItems.add(orderItemRepository.save(orderItem));
        }

        order.setItems(orderItems);
        order.setSubtotal(subtotal);
        
        BigDecimal deliveryFee = request.getFulfillmentType() == FulfillmentType.HOME_DELIVERY 
                ? new BigDecimal("5.00") : BigDecimal.ZERO;
        order.setDeliveryFee(deliveryFee);
        order.setTotalAmount(subtotal.add(deliveryFee));
        
        order = orderRepository.save(order);

        // Clear Cart
        cartItemRepository.deleteAll(cart.getItems());
        cart.getItems().clear();
        cartRepository.save(cart);

        return mapToDto(order);
    }

    public List<OrderResponseDto> getUserOrders(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        List<Order> orders = orderRepository.findByUserId(user.getId());
        List<OrderResponseDto> dtos = new ArrayList<>();
        for (Order order : orders) {
            dtos.add(mapToDto(order));
        }
        return dtos;
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

        List<OrderItemResponseDto> items = new ArrayList<>();
        for (OrderItem item : order.getItems()) {
            OrderItemResponseDto itemDto = new OrderItemResponseDto();
            itemDto.setId(item.getId());
            itemDto.setProductId(item.getProduct().getId());
            itemDto.setProductName(item.getProduct().getName());
            itemDto.setQuantity(item.getQuantity());
            itemDto.setUnitPrice(item.getUnitPrice());
            items.add(itemDto);
        }
        dto.setItems(items);
        return dto;
    }
}
