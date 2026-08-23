package com.dmart.service;

import com.dmart.dto.CartDto;
import com.dmart.dto.CartItemDto;
import com.dmart.entity.Cart;
import com.dmart.entity.CartItem;
import com.dmart.entity.Product;
import com.dmart.entity.User;
import com.dmart.repository.CartItemRepository;
import com.dmart.repository.CartRepository;
import com.dmart.repository.ProductRepository;
import com.dmart.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository, 
                       ProductRepository productRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CartDto getCartByUserEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = cartRepository.findByUserId(user.getId()).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        });
        return mapToDto(cart);
    }

    @Transactional
    public CartDto addToCart(String email, Long productId, Integer quantity) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = cartRepository.findByUserId(user.getId()).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        });

        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            cartItemRepository.save(item);
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(quantity);
            cart.getItems().add(newItem);
            cartItemRepository.save(newItem);
        }

        return mapToDto(cartRepository.save(cart));
    }

    @Transactional
    public CartDto updateCartItem(String email, Long productId, Integer quantity) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = cartRepository.findByUserId(user.getId()).orElseThrow(() -> new RuntimeException("Cart not found"));

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Product not in cart"));

        if (quantity <= 0) {
            cart.getItems().remove(item);
            cartItemRepository.delete(item);
        } else {
            item.setQuantity(quantity);
            cartItemRepository.save(item);
        }

        return mapToDto(cartRepository.save(cart));
    }

    @Transactional
    public CartDto clearCart(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = cartRepository.findByUserId(user.getId()).orElseThrow(() -> new RuntimeException("Cart not found"));
        
        cart.getItems().clear();
        cartItemRepository.deleteAll(cart.getItems());
        return mapToDto(cartRepository.save(cart));
    }

    private CartDto mapToDto(Cart cart) {
        CartDto dto = new CartDto();
        dto.setId(cart.getId());
        List<CartItemDto> items = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        if (cart.getItems() != null) {
            for (CartItem item : cart.getItems()) {
                CartItemDto itemDto = new CartItemDto();
                itemDto.setId(item.getId());
                itemDto.setProductId(item.getProduct().getId());
                itemDto.setProductName(item.getProduct().getName());
                itemDto.setProductImageUrl(item.getProduct().getImageUrl());
                itemDto.setPrice(item.getProduct().getPrice());
                itemDto.setQuantity(item.getQuantity());
                
                BigDecimal subTotal = item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
                itemDto.setSubTotal(subTotal);
                total = total.add(subTotal);
                
                items.add(itemDto);
            }
        }
        
        dto.setItems(items);
        dto.setTotalPrice(total);
        return dto;
    }
}
