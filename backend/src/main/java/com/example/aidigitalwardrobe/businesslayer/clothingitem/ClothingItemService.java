package com.example.aidigitalwardrobe.businesslayer.clothingitem;

import com.example.aidigitalwardrobe.presentationlayer.clothingItem.ClothingItemRequestModel;
import com.example.aidigitalwardrobe.presentationlayer.clothingItem.ClothingItemResponseModel;

import java.util.List;

public interface ClothingItemService {
    List<ClothingItemResponseModel> getAllClothingItems();
    ClothingItemResponseModel getClothingItemById(String id);
    ClothingItemResponseModel addClothingItem(ClothingItemRequestModel request);
    void deleteClothingItemById(String id);
}
