package com.example.aidigitalwardrobe.presentationlayer.clothingItem;

import com.example.aidigitalwardrobe.dataaccesslayer.clothingitem.ClothingType;
import com.example.aidigitalwardrobe.dataaccesslayer.clothingitem.ColorType;
import com.example.aidigitalwardrobe.dataaccesslayer.clothingitem.MaterialType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClothingItemRequestModel {
    private ClothingType clothingType;
    private ColorType colorType;
    private String clothingImagePath;
    private MaterialType materialType;
}
