package com.dmart.dto;

import java.math.BigDecimal;

public class DashboardStatsDto {
    private long totalUsers;
    private long totalOrders;
    private long totalProducts;
    private BigDecimal totalRevenue;
    private long pendingOrders;

    // Getters and setters
    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }
    public long getTotalOrders() { return totalOrders; }
    public void setTotalOrders(long totalOrders) { this.totalOrders = totalOrders; }
    public long getTotalProducts() { return totalProducts; }
    public void setTotalProducts(long totalProducts) { this.totalProducts = totalProducts; }
    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; }
    public long getPendingOrders() { return pendingOrders; }
    public void setPendingOrders(long pendingOrders) { this.pendingOrders = pendingOrders; }
}
