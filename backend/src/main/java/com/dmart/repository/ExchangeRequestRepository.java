package com.dmart.repository;

import com.dmart.entity.ExchangeRequest;
import com.dmart.enums.ExchangeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExchangeRequestRepository extends JpaRepository<ExchangeRequest, Long> {
    List<ExchangeRequest> findByOrderId(Long orderId);
    List<ExchangeRequest> findByStatus(ExchangeStatus status);
    List<ExchangeRequest> findByOrder_User_Id(Long userId);
}
