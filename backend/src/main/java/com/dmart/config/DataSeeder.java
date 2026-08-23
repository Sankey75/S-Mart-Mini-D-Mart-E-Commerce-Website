package com.dmart.config;

import com.dmart.entity.Role;
import com.dmart.entity.Category;
import com.dmart.entity.Product;
import com.dmart.entity.Inventory;
import com.dmart.repository.RoleRepository;
import com.dmart.repository.CategoryRepository;
import com.dmart.repository.ProductRepository;
import com.dmart.repository.InventoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Optional;

@Component
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;

    public DataSeeder(RoleRepository roleRepository, 
                      CategoryRepository categoryRepository,
                      ProductRepository productRepository,
                      InventoryRepository inventoryRepository) {
        this.roleRepository = roleRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        seedRole("ROLE_CUSTOMER");
        seedRole("ROLE_ADMIN");
        seedRole("ROLE_MANAGER");
        seedRole("ROLE_STAFF");
        
        seedProducts();
    }

    private void seedRole(String roleName) {
        if (!roleRepository.findByName(roleName).isPresent()) {
            Role role = new Role();
            role.setName(roleName);
            roleRepository.save(role);
        }
    }
    
    private void seedProducts() {
        if (categoryRepository.count() == 0) {
            Category fruits = new Category();
            fruits.setName("Fruits & Vegetables");
            fruits.setDescription("Fresh organic produce");
            categoryRepository.save(fruits);
            
            Category dairy = new Category();
            dairy.setName("Dairy & Bakery");
            dairy.setDescription("Milk, cheese, and fresh bread");
            categoryRepository.save(dairy);

            Category snacks = new Category();
            snacks.setName("Snacks & Beverages");
            snacks.setDescription("Chips, drinks, and more");
            categoryRepository.save(snacks);

            createProduct(fruits, "Organic Bananas", "Fresh organic bananas from Ecuador.", new BigDecimal("2.99"), "SKU-BAN-01", "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400", "Bunch", 150);
            createProduct(fruits, "Honeycrisp Apples", "Sweet and crunchy honeycrisp apples.", new BigDecimal("4.49"), "SKU-APP-01", "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400", "lb", 200); // Fixed Apple
            createProduct(dairy, "Whole Milk 1 Gallon", "Farm fresh whole milk.", new BigDecimal("3.50"), "SKU-MLK-01", "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400", "Gallon", 50);
            createProduct(dairy, "Artisan Sourdough Bread", "Freshly baked artisan sourdough bread.", new BigDecimal("5.99"), "SKU-BRD-01", "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400", "Loaf", 30); // Fixed Bread
            
            String[][] realItems = {
                {"Tomatoes", "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400", "Fruits & Vegetables"},
                {"Potatoes", "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400", "Fruits & Vegetables"},
                {"Onions", "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400", "Fruits & Vegetables"},
                {"Carrots", "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400", "Fruits & Vegetables"},
                {"Cheese", "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400", "Dairy & Bakery"},
                {"Yogurt", "https://images.unsplash.com/photo-1571212515416-f363c4e366de?w=400", "Dairy & Bakery"},
                {"Orange Juice", "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400", "Snacks & Beverages"},
                {"Potato Chips", "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400", "Snacks & Beverages"},
                {"Cookies", "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400", "Snacks & Beverages"},
                {"Coffee Beans", "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400", "Snacks & Beverages"},
                {"Green Tea", "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400", "Snacks & Beverages"},
                {"Dark Chocolate", "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400", "Snacks & Beverages"},
                {"Cola Soda", "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400", "Snacks & Beverages"},
                {"Avocados", "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400", "Fruits & Vegetables"},
                {"Farm Eggs", "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400", "Dairy & Bakery"},
                {"Butter", "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400", "Dairy & Bakery"}
            };
            
            String[] adjectives = {"Fresh", "Organic", "Premium", "Farm", "Quality", "Imported", "Local", "Tasty", "Classic", "Deluxe"};

            for (int i = 1; i <= 32; i++) {
                String[] itemData = realItems[i % realItems.length];
                String baseName = itemData[0];
                String imageUrl = itemData[1];
                String catName = itemData[2];
                
                Category c = catName.equals("Fruits & Vegetables") ? fruits : (catName.equals("Dairy & Bakery") ? dairy : snacks);
                
                String adj = adjectives[(int)(Math.random() * adjectives.length)];
                String fullName = adj + " " + baseName;
                
                BigDecimal price = new BigDecimal(String.format("%.2f", 1.0 + Math.random() * 15.0));
                
                createProduct(c, fullName, "High quality " + fullName.toLowerCase() + ".", price, "SKU-GEN-" + String.format("%03d", i), imageUrl, "Pack", 100);
            }
        }
    }
    
    private void createProduct(Category category, String name, String desc, BigDecimal price, String sku, String image, String unit, int qty) {
        Product product = new Product();
        product.setCategory(category);
        product.setName(name);
        product.setDescription(desc);
        product.setPrice(price);
        product.setSku(sku);
        product.setImageUrl(image);
        product.setUnit(unit);
        product.setActive(true);
        product = productRepository.save(product);
        
        Inventory inventory = new Inventory();
        inventory.setProduct(product);
        inventory.setAvailableQuantity(qty);
        inventory.setReservedQuantity(0);
        inventory.setLowStockThreshold(10);
        inventoryRepository.save(inventory);
    }
}
