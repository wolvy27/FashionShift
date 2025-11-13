package com.example.aidigitalwardrobe.datamapperlayer.clothingitem;

import com.example.aidigitalwardrobe.dataaccesslayer.clothingitem.ClothingItem;
import com.example.aidigitalwardrobe.presentationlayer.clothingItem.ClothingItemRequestModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClothingItemRequestMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "clothingItemIdentifier", ignore = true)
    @Mapping(source = "clothingType", target = "clothingType")
    @Mapping(source = "colorType", target = "colorType")
    @Mapping(source = "clothingImagePath", target = "clothingImagePath")
    @Mapping(source = "materialType", target = "materialType")
    ClothingItem requestModelToEntity(ClothingItemRequestModel requestModel);
}
