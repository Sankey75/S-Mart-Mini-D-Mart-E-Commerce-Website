package com.dmart.dto;

import com.dmart.enums.FulfillmentType;
import com.dmart.enums.OrderStatus;
import com.dmart.enums.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class OrderResponseDto {
    private Long id;
    private String orderNumber;
    private BigDecimal subtotal;
    private BigDecimal deliveryFee;
    private BigDecimal discount;
    private BigDecimal totalAmount;
    private FulfillmentType fulfillmentType;
    private PaymentStatus paymentStatus;
    private OrderStatus orderStatus;
    private LocalDate scheduledDate;
    private String scheduledTime;
    private LocalDateTime createdAt;
    private List<OrderItemResponseDto> items;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }
    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
    public BigDecimal getDeliveryFee() { return deliveryFee; }
    public void setDeliveryFee(BigDecimal deliveryFee) { this.deliveryFee = deliveryFee; }
    public BigDecimal getDiscount() { return discount; }
    public void setDiscount(BigDecimal discount) { this.discount = discount; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    public FulfillmentType getFulfillmentType() { return fulfillmentType; }
    public void setFulfillmentType(FulfillmentType fulfillmentType) { this.fulfillmentType = fulfillmentType; }
    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }
    public OrderStatus getOrderStatus() { return orderStatus; }
    public void setOrderStatus(OrderStatus orderStatus) { this.orderStatus = orderStatus; }
    public LocalDate getScheduledDate() { return scheduledDate; }
    public void setScheduledDate(LocalDate scheduledDate) { this.scheduledDate = scheduledDate; }
    public String getScheduledTime() { return scheduledTime; }
    public void setScheduledTime(String scheduledTime) { this.scheduledTime = scheduledTime; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public List<OrderItemResponseDto> getItems() { return items; }
    public void setItems(List<OrderItemResponseDto> items) { this.items = items; }
}
