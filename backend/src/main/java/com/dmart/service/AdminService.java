package com.dmart.service;

import com.dmart.dto.DashboardStatsDto;
import com.dmart.enums.OrderStatus;
import com.dmart.repository.OrderRepository;
import com.dmart.repository.ProductRepository;
import com.dmart.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class AdminService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public AdminService(UserRepository userRepository, OrderRepository orderRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public DashboardStatsDto getDashboardStats() {
        DashboardStatsDto stats = new DashboardStatsDto();
        stats.setTotalUsers(userRepository.count());
        stats.setTotalOrders(orderRepository.count());
        stats.setTotalProducts(productRepository.count());
        
        // Calculate revenue
        BigDecimal revenue = orderRepository.findAll().stream()
                .filter(o -> o.getOrderStatus() == OrderStatus.DELIVERED || o.getOrderStatus() == OrderStatus.PICKED_UP)
                .map(o -> o.getTotalAmount())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        stats.setTotalRevenue(revenue);
        
        // Pending orders
        long pending = orderRepository.findAll().stream()
                .filter(o -> o.getOrderStatus() == OrderStatus.PLACED || o.getOrderStatus() == OrderStatus.PREPARING)
                .count();
        stats.setPendingOrders(pending);
        
        return stats;
    }

    public java.util.List<com.dmart.entity.AuditLog> getAuditLogs() {
        // Return latest 50 logs for admin dashboard
        return ((com.dmart.repository.AuditLogRepository) org.springframework.web.context.support.WebApplicationContextUtils
                .getRequiredWebApplicationContext(
                        ((org.springframework.web.context.request.ServletRequestAttributes) 
                        org.springframework.web.context.request.RequestContextHolder.getRequestAttributes()).getRequest().getServletContext()
                ).getBean(com.dmart.repository.AuditLogRepository.class)).findAll(
                org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "timestamp"));
    }
}
