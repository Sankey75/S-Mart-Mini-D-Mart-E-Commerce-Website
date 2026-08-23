package com.dmart.dto;

import com.dmart.enums.ExchangeStatus;
import java.time.LocalDateTime;

public class ExchangeResponseDto {
    private Long id;
    private String orderNumber;
    private String productName;
    private String replacementProductName;
    private int quantity;
    private String reason;
    private String description;
    private ExchangeStatus status;
    private LocalDateTime requestedDate;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public String getReplacementProductName() { return replacementProductName; }
    public void setReplacementProductName(String replacementProductName) { this.replacementProductName = replacementProductName; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public ExchangeStatus getStatus() { return status; }
    public void setStatus(ExchangeStatus status) { this.status = status; }
    public LocalDateTime getRequestedDate() { return requestedDate; }
    public void setRequestedDate(LocalDateTime requestedDate) { this.requestedDate = requestedDate; }
}
