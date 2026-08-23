package com.dmart.service;

import com.dmart.entity.Inventory;
import com.dmart.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {
    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public Optional<Inventory> getInventoryByProductId(Long productId) {
        return inventoryRepository.findByProductId(productId);
    }

    public Inventory updateInventory(Long productId, Inventory inventoryDetails) {
        return inventoryRepository.findByProductId(productId).map(inventory -> {
            inventory.setAvailableQuantity(inventoryDetails.getAvailableQuantity());
            inventory.setReservedQuantity(inventoryDetails.getReservedQuantity());
            inventory.setLowStockThreshold(inventoryDetails.getLowStockThreshold());
            return inventoryRepository.save(inventory);
        }).orElseThrow(() -> new RuntimeException("Inventory not found for product id: " + productId));
    }
}
