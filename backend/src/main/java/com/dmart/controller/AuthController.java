package com.dmart.controller;

import com.dmart.dto.request.LoginRequest;
import com.dmart.dto.request.RegisterRequest;
import com.dmart.dto.response.JwtAuthenticationResponse;
import com.dmart.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<JwtAuthenticationResponse> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(authService.register(registerRequest));
    }
}
