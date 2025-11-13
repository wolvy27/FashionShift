package com.example.aidigitalwardrobe.dataaccesslayer.clothingitem;

import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.util.UUID;

@Embeddable
@Getter
public class ClothingItemIdentifier {
    private String clothingItemId;

    public ClothingItemIdentifier() {
        this.clothingItemId = UUID.randomUUID().toString();
    }

    public ClothingItemIdentifier(String clothingItemId) {
        this.clothingItemId = clothingItemId;
    }
}
