package com.dmart.controller;

import com.dmart.dto.CartDto;
import com.dmart.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<CartDto> getCart(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(cartService.getCartByUserEmail(email));
    }

    @PostMapping("/add")
    public ResponseEntity<CartDto> addToCart(
            Authentication authentication,
            @RequestParam Long productId,
            @RequestParam Integer quantity) {
        String email = authentication.getName();
        return ResponseEntity.ok(cartService.addToCart(email, productId, quantity));
    }

    @PutMapping("/update")
    public ResponseEntity<CartDto> updateCartItem(
            Authentication authentication,
            @RequestParam Long productId,
            @RequestParam Integer quantity) {
        String email = authentication.getName();
        return ResponseEntity.ok(cartService.updateCartItem(email, productId, quantity));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<CartDto> clearCart(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(cartService.clearCart(email));
    }
}
