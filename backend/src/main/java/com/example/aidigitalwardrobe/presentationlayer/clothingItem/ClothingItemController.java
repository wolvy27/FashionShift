package com.example.aidigitalwardrobe.presentationlayer.clothingItem;

import com.example.aidigitalwardrobe.businesslayer.clothingitem.ClothingItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clothing-items")
@CrossOrigin(origins = "*") // Allow requests from frontend (adjust as needed)
public class ClothingItemController {

    private final ClothingItemService clothingItemService;

    @Autowired
    public ClothingItemController(ClothingItemService clothingItemService) {
        this.clothingItemService = clothingItemService;
    }

    @GetMapping
    public ResponseEntity<List<ClothingItemResponseModel>> getAllClothingItems() {
        try {
            List<ClothingItemResponseModel> items = clothingItemService.getAllClothingItems();
            return ResponseEntity.ok(items);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClothingItemResponseModel> getClothingItemById(@PathVariable String id) {
        try {
            ClothingItemResponseModel response = clothingItemService.getClothingItemById(id);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<ClothingItemResponseModel> addClothingItem(@RequestBody ClothingItemRequestModel requestModel) {
        try {
            ClothingItemResponseModel createdItem = clothingItemService.addClothingItem(requestModel);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdItem);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteClothingItem(@PathVariable String id) {
        try {
            clothingItemService.deleteClothingItemById(id);
            return ResponseEntity.ok("Clothing item with ID '" + id + "' has been deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}

