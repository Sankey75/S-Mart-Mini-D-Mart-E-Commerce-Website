package com.dmart.dto;

public class ExchangeRequestDto {
    private Long orderId;
    private Long productId;
    private Long replacementProductId;
    private int quantity;
    private String reason;
    private String description;

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public Long getReplacementProductId() { return replacementProductId; }
    public void setReplacementProductId(Long replacementProductId) { this.replacementProductId = replacementProductId; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
