package com.dmart.service;

import com.dmart.dto.request.LoginRequest;
import com.dmart.dto.request.RegisterRequest;
import com.dmart.dto.response.JwtAuthenticationResponse;
import com.dmart.entity.Role;
import com.dmart.entity.User;
import com.dmart.repository.RoleRepository;
import com.dmart.repository.UserRepository;
import com.dmart.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository,
                       RoleRepository roleRepository, PasswordEncoder passwordEncoder,
                       JwtService jwtService, UserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    public JwtAuthenticationResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
        String jwt = jwtService.generateToken(userDetails);

        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
        List<String> roles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return new JwtAuthenticationResponse(jwt, user.getId(), user.getName(), user.getEmail(), roles);
    }

    @Transactional
    public JwtAuthenticationResponse register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setPhone(registerRequest.getPhone());

        String roleName = registerRequest.getRole() != null && !registerRequest.getRole().isEmpty() 
            ? registerRequest.getRole() 
            : "ROLE_CUSTOMER";
            
        if ("ROLE_ADMIN".equals(roleName)) {
            if (!"admin123".equals(registerRequest.getAdminSecret())) {
                throw new RuntimeException("Error: Invalid Admin Secret Code!");
            }
        }
            
        Role userRole = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        user.setRoles(Collections.singleton(userRole));

        userRepository.save(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String jwt = jwtService.generateToken(userDetails);
        
        return new JwtAuthenticationResponse(jwt, user.getId(), user.getName(), user.getEmail(), List.of(roleName));
    }
}
