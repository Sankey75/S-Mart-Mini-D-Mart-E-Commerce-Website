package com.dmart.controller;

import com.dmart.dto.DashboardStatsDto;
import com.dmart.entity.User;
import com.dmart.repository.UserRepository;
import com.dmart.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;
    private final UserRepository userRepository;

    public AdminController(AdminService adminService, UserRepository userRepository) {
        this.adminService = adminService;
        this.userRepository = userRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDto> getStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<List<com.dmart.entity.AuditLog>> getAuditLogs() {
        return ResponseEntity.ok(adminService.getAuditLogs());
    }
}
