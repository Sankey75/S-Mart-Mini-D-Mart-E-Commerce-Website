package com.dmart.dto;

import java.math.BigDecimal;

public class CartItemDto {
    private Long id;
    private Long productId;
    private String productName;
    private String productImageUrl;
    private BigDecimal price;
    private Integer quantity;
    private BigDecimal subTotal;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public String getProductImageUrl() { return productImageUrl; }
    public void setProductImageUrl(String productImageUrl) { this.productImageUrl = productImageUrl; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public BigDecimal getSubTotal() { return subTotal; }
    public void setSubTotal(BigDecimal subTotal) { this.subTotal = subTotal; }
}
