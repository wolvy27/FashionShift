package com.example.aidigitalwardrobe.presentationlayer.clothingItem;

import com.example.aidigitalwardrobe.dataaccesslayer.clothingitem.ClothingType;
import com.example.aidigitalwardrobe.dataaccesslayer.clothingitem.ColorType;
import com.example.aidigitalwardrobe.dataaccesslayer.clothingitem.MaterialType;

public class ClothingItemResponseModel {
    private String clothingItemIdentifier;
    private ClothingType clothingType;
    private ColorType colorType;
    private String clothingImagePath;
    private MaterialType materialType;
}
