package com.example.aidigitalwardrobe.datamapperlayer.clothingitem;

import com.example.aidigitalwardrobe.dataaccesslayer.clothingitem.ClothingItem;
import com.example.aidigitalwardrobe.presentationlayer.clothingItem.ClothingItemResponseModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClothingItemResponseMapper {
    @Mapping(source = "clothingItemIdentifier.clothingItemId", target = "clothingItemId") 
    @Mapping(source = "user.userIdentifier.userId", target = "userId")
    @Mapping(source = "clothingType", target = "clothingType")
    @Mapping(source = "colorType", target = "colorType")
    @Mapping(source = "clothingImagePath", target = "clothingImagePath")
    @Mapping(source = "materialType", target = "materialType")
    ClothingItemResponseModel entityToResponseModel(ClothingItem clothingItem);
}
