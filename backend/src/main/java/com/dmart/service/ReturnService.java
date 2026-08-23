package com.dmart.service;

import com.dmart.dto.ReturnRequestDto;
import com.dmart.dto.ReturnResponseDto;
import com.dmart.entity.Order;
import com.dmart.entity.Product;
import com.dmart.entity.ReturnRequest;
import com.dmart.entity.User;
import com.dmart.enums.OrderStatus;
import com.dmart.enums.ReturnStatus;
import com.dmart.repository.OrderRepository;
import com.dmart.repository.ProductRepository;
import com.dmart.repository.ReturnRequestRepository;
import com.dmart.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReturnService {
    private final ReturnRequestRepository returnRequestRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ReturnService(ReturnRequestRepository returnRequestRepository, OrderRepository orderRepository,
                         ProductRepository productRepository, UserRepository userRepository) {
        this.returnRequestRepository = returnRequestRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ReturnResponseDto createReturnRequest(String email, ReturnRequestDto requestDto) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Order order = orderRepository.findById(requestDto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized: Order does not belong to user");
        }
        
        if (order.getOrderStatus() != OrderStatus.DELIVERED && order.getOrderStatus() != OrderStatus.PICKED_UP) {
            throw new RuntimeException("Returns are only allowed for delivered or picked up orders");
        }

        Product product = productRepository.findById(requestDto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        ReturnRequest returnRequest = new ReturnRequest();
        returnRequest.setOrder(order);
        returnRequest.setProduct(product);
        returnRequest.setQuantity(requestDto.getQuantity());
        returnRequest.setReason(requestDto.getReason());
        returnRequest.setDescription(requestDto.getDescription());
        returnRequest.setStatus(ReturnStatus.REQUESTED);

        ReturnRequest saved = returnRequestRepository.save(returnRequest);
        return mapToDto(saved);
    }

    public List<ReturnResponseDto> getUserReturns(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return returnRequestRepository.findAll().stream()
                .filter(req -> req.getOrder().getUser().getId().equals(user.getId()))
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<ReturnResponseDto> getAllReturns() {
        return returnRequestRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReturnResponseDto updateReturnStatus(Long returnId, ReturnStatus status) {
        ReturnRequest returnRequest = returnRequestRepository.findById(returnId)
                .orElseThrow(() -> new RuntimeException("Return Request not found"));

        returnRequest.setStatus(status);
        if (status == ReturnStatus.APPROVED) {
            returnRequest.setApprovedDate(LocalDateTime.now());
        } else if (status == ReturnStatus.COMPLETED || status == ReturnStatus.REJECTED) {
            returnRequest.setProcessedDate(LocalDateTime.now());
        }

        ReturnRequest saved = returnRequestRepository.save(returnRequest);
        return mapToDto(saved);
    }

    private ReturnResponseDto mapToDto(ReturnRequest returnRequest) {
        ReturnResponseDto dto = new ReturnResponseDto();
        dto.setId(returnRequest.getId());
        dto.setOrderId(returnRequest.getOrder().getId());
        dto.setOrderNumber(returnRequest.getOrder().getOrderNumber());
        dto.setProductId(returnRequest.getProduct().getId());
        dto.setProductName(returnRequest.getProduct().getName());
        dto.setQuantity(returnRequest.getQuantity());
        dto.setReason(returnRequest.getReason());
        dto.setDescription(returnRequest.getDescription());
        dto.setStatus(returnRequest.getStatus());
        dto.setRequestedDate(returnRequest.getRequestedDate());
        return dto;
    }
}
