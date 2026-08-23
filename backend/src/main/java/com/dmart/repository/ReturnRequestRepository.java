package com.dmart.repository;

import com.dmart.entity.ReturnRequest;
import com.dmart.enums.ReturnStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReturnRequestRepository extends JpaRepository<ReturnRequest, Long> {
    List<ReturnRequest> findByOrderId(Long orderId);
    List<ReturnRequest> findByStatus(ReturnStatus status);
}
