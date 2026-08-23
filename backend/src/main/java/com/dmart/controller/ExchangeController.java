package com.dmart.controller;

import com.dmart.dto.ExchangeRequestDto;
import com.dmart.dto.ExchangeResponseDto;
import com.dmart.enums.ExchangeStatus;
import com.dmart.service.ExchangeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exchanges")
public class ExchangeController {

    private final ExchangeService exchangeService;

    public ExchangeController(ExchangeService exchangeService) {
        this.exchangeService = exchangeService;
    }

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ExchangeResponseDto> createExchangeRequest(@RequestBody ExchangeRequestDto requestDto, Authentication authentication) {
        return ResponseEntity.ok(exchangeService.createExchangeRequest(requestDto, authentication.getName()));
    }

    @GetMapping("/my-exchanges")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<ExchangeResponseDto>> getMyExchanges(Authentication authentication) {
        return ResponseEntity.ok(exchangeService.getUserExchanges(authentication.getName()));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('STAFF', 'MANAGER', 'ADMIN')")
    public ResponseEntity<List<ExchangeResponseDto>> getAllExchanges() {
        return ResponseEntity.ok(exchangeService.getAllExchanges());
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('STAFF', 'MANAGER', 'ADMIN')")
    public ResponseEntity<ExchangeResponseDto> updateExchangeStatus(
            @PathVariable Long id, 
            @RequestParam ExchangeStatus status) {
        return ResponseEntity.ok(exchangeService.updateExchangeStatus(id, status));
    }
}
