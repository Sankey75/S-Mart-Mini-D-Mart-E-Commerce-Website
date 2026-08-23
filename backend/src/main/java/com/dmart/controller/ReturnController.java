package com.dmart.controller;

import com.dmart.dto.ReturnRequestDto;
import com.dmart.dto.ReturnResponseDto;
import com.dmart.enums.ReturnStatus;
import com.dmart.service.ReturnService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/returns")
public class ReturnController {

    private final ReturnService returnService;

    public ReturnController(ReturnService returnService) {
        this.returnService = returnService;
    }

    @PostMapping
    public ResponseEntity<ReturnResponseDto> createReturnRequest(Authentication auth, @RequestBody ReturnRequestDto dto) {
        return ResponseEntity.ok(returnService.createReturnRequest(auth.getName(), dto));
    }

    @GetMapping("/my-returns")
    public ResponseEntity<List<ReturnResponseDto>> getUserReturns(Authentication auth) {
        return ResponseEntity.ok(returnService.getUserReturns(auth.getName()));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('STAFF', 'MANAGER', 'ADMIN')")
    public ResponseEntity<List<ReturnResponseDto>> getAllReturns() {
        return ResponseEntity.ok(returnService.getAllReturns());
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('STAFF', 'MANAGER', 'ADMIN')")
    public ResponseEntity<ReturnResponseDto> updateReturnStatus(@PathVariable Long id, @RequestParam ReturnStatus status) {
        return ResponseEntity.ok(returnService.updateReturnStatus(id, status));
    }
}
