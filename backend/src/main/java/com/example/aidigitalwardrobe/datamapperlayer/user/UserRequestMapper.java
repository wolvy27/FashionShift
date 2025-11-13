package com.example.aidigitalwardrobe.datamapperlayer.user;

import com.example.aidigitalwardrobe.dataaccesslayer.user.User;
import com.example.aidigitalwardrobe.presentationlayer.user.UserRequestModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserRequestMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userIdentifier", ignore = true)
    @Mapping(target = "clothingItems", ignore = true)
    User requestModelToEntity(UserRequestModel request);
}