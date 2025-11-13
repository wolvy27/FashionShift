package com.example.aidigitalwardrobe.dataaccesslayer.clothingitem;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClothingItemRepository extends JpaRepository<ClothingItem, Integer> {
    ClothingItem findClothingItemByClothingItemIdentifier_ClothingItemId(String clothingItemId);
}
