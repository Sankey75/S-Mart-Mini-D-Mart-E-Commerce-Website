package com.dmart.service;

import com.dmart.dto.ExchangeRequestDto;
import com.dmart.dto.ExchangeResponseDto;
import com.dmart.entity.ExchangeRequest;
import com.dmart.entity.Order;
import com.dmart.entity.Product;
import com.dmart.entity.User;
import com.dmart.enums.ExchangeStatus;
import com.dmart.enums.OrderStatus;
import com.dmart.repository.ExchangeRequestRepository;
import com.dmart.repository.OrderRepository;
import com.dmart.repository.ProductRepository;
import com.dmart.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExchangeService {

    private final ExchangeRequestRepository exchangeRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ExchangeService(ExchangeRequestRepository exchangeRepository, 
                           OrderRepository orderRepository,
                           ProductRepository productRepository, 
                           UserRepository userRepository) {
        this.exchangeRepository = exchangeRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ExchangeResponseDto createExchangeRequest(ExchangeRequestDto requestDto, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = orderRepository.findById(requestDto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized: Order does not belong to user");
        }
        
        if (order.getOrderStatus() != OrderStatus.DELIVERED && order.getOrderStatus() != OrderStatus.PICKED_UP) {
            throw new RuntimeException("Exchanges are only allowed for delivered or picked up orders");
        }

        Product originalProduct = productRepository.findById(requestDto.getProductId())
                .orElseThrow(() -> new RuntimeException("Original product not found"));

        Product replacementProduct = productRepository.findById(requestDto.getReplacementProductId())
                .orElseThrow(() -> new RuntimeException("Replacement product not found"));

        ExchangeRequest exchangeRequest = new ExchangeRequest();
        exchangeRequest.setOrder(order);
        exchangeRequest.setProduct(originalProduct);
        exchangeRequest.setReplacementProduct(replacementProduct);
        exchangeRequest.setQuantity(requestDto.getQuantity());
        exchangeRequest.setReason(requestDto.getReason());
        exchangeRequest.setDescription(requestDto.getDescription());
        exchangeRequest.setStatus(ExchangeStatus.REQUESTED);

        ExchangeRequest saved = exchangeRepository.save(exchangeRequest);
        return mapToDto(saved);
    }

    public List<ExchangeResponseDto> getUserExchanges(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return exchangeRepository.findByOrder_User_Id(user.getId()).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<ExchangeResponseDto> getAllExchanges() {
        return exchangeRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ExchangeResponseDto updateExchangeStatus(Long exchangeId, ExchangeStatus status) {
        ExchangeRequest exchangeRequest = exchangeRepository.findById(exchangeId)
                .orElseThrow(() -> new RuntimeException("Exchange request not found"));

        exchangeRequest.setStatus(status);
        ExchangeRequest saved = exchangeRepository.save(exchangeRequest);
        return mapToDto(saved);
    }

    private ExchangeResponseDto mapToDto(ExchangeRequest req) {
        ExchangeResponseDto dto = new ExchangeResponseDto();
        dto.setId(req.getId());
        dto.setOrderNumber(req.getOrder().getOrderNumber());
        dto.setProductName(req.getProduct().getName());
        dto.setReplacementProductName(req.getReplacementProduct().getName());
        dto.setQuantity(req.getQuantity());
        dto.setReason(req.getReason());
        dto.setDescription(req.getDescription());
        dto.setStatus(req.getStatus());
        dto.setRequestedDate(req.getCreatedAt());
        return dto;
    }
}
