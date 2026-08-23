package com.dmart.entity;

import com.dmart.enums.ReturnStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "return_requests")
public class ReturnRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false, length = 255)
    private String reason;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReturnStatus status = ReturnStatus.REQUESTED;

    @CreationTimestamp
    @Column(name = "requested_date", updatable = false)
    private LocalDateTime requestedDate;

    @Column(name = "approved_date")
    private LocalDateTime approvedDate;

    @Column(name = "processed_date")
    private LocalDateTime processedDate;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public ReturnStatus getStatus() { return status; }
    public void setStatus(ReturnStatus status) { this.status = status; }
    public LocalDateTime getRequestedDate() { return requestedDate; }
    public void setRequestedDate(LocalDateTime requestedDate) { this.requestedDate = requestedDate; }
    public LocalDateTime getApprovedDate() { return approvedDate; }
    public void setApprovedDate(LocalDateTime approvedDate) { this.approvedDate = approvedDate; }
    public LocalDateTime getProcessedDate() { return processedDate; }
    public void setProcessedDate(LocalDateTime processedDate) { this.processedDate = processedDate; }
}
