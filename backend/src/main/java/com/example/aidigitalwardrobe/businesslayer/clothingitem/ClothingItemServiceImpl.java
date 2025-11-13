package com.example.aidigitalwardrobe.businesslayer.clothingitem;

import com.example.aidigitalwardrobe.dataaccesslayer.clothingitem.ClothingItem;
import com.example.aidigitalwardrobe.dataaccesslayer.clothingitem.ClothingItemRepository;
import com.example.aidigitalwardrobe.datamapperlayer.clothingitem.ClothingItemRequestMapper;
import com.example.aidigitalwardrobe.datamapperlayer.clothingitem.ClothingItemResponseMapper;
import com.example.aidigitalwardrobe.presentationlayer.clothingItem.ClothingItemResponseModel;
import com.example.aidigitalwardrobe.presentationlayer.clothingItem.ClothingItemRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClothingItemServiceImpl implements ClothingItemService {

    private final ClothingItemRepository clothingItemRepository;
    private final ClothingItemRequestMapper clothingItemRequestMapper;
    private final ClothingItemResponseMapper clothingItemResponseMapper;

    @Autowired
    public ClothingItemServiceImpl(ClothingItemRepository clothingItemRepository,
                                   ClothingItemRequestMapper clothingItemRequestMapper,
                                   ClothingItemResponseMapper clothingItemResponseMapper) {
        this.clothingItemRepository = clothingItemRepository;
        this.clothingItemRequestMapper = clothingItemRequestMapper;
        this.clothingItemResponseMapper = clothingItemResponseMapper;
    }

    @Override
    public List<ClothingItemResponseModel> getAllClothingItems() {
        List<ClothingItem> items = clothingItemRepository.findAll();
        if (items.isEmpty()) {
            throw new RuntimeException("No clothing items found in the wardrobe.");
        }

        List<ClothingItemResponseModel> responseList = new ArrayList<>();
        for (ClothingItem item : items) {
            ClothingItemResponseModel response = clothingItemResponseMapper.entityToResponseModel(item);
            responseList.add(response);
        }

        return responseList;
    }

    @Override
    public ClothingItemResponseModel getClothingItemById(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("Invalid clothing item ID provided.");
        }

        ClothingItem foundItem = clothingItemRepository.findClothingItemByClothingItemIdentifier_ClothingItemId(id);

        if (foundItem == null) {
            throw new RuntimeException("Clothing item with ID '" + id + "' not found.");
        }

        return clothingItemResponseMapper.entityToResponseModel(foundItem);
    }

    @Override
    public ClothingItemResponseModel addClothingItem(ClothingItemRequestModel request) {
        if (request == null) {
            throw new IllegalArgumentException("Clothing item request cannot be null.");
        }

        if (request.getClothingType() == null ||
                request.getColorType() == null ||
                request.getMaterialType() == null) {
            throw new IllegalArgumentException("Clothing type, color, and material must all be provided.");
        }

        ClothingItem newItem = new ClothingItem();
        newItem.setClothingType(request.getClothingType());
        newItem.setColorType(request.getColorType());
        newItem.setClothingImagePath(request.getClothingImagePath());
        newItem.setMaterialType(request.getMaterialType());

        ClothingItem savedItem = clothingItemRepository.save(newItem);
        if (savedItem == null) {
            throw new RuntimeException("Failed to save the clothing item. Please try again.");
        }

        return clothingItemResponseMapper.entityToResponseModel(savedItem);
    }

    @Override
    public void deleteClothingItemById(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("Invalid clothing item ID provided for deletion.");
        }

        ClothingItem existingItem = clothingItemRepository.findClothingItemByClothingItemIdentifier_ClothingItemId(id);

        if (existingItem == null) {
            throw new RuntimeException("Cannot delete. Clothing item with ID '" + id + "' does not exist.");
        }

        clothingItemRepository.delete(existingItem);
    }
}
