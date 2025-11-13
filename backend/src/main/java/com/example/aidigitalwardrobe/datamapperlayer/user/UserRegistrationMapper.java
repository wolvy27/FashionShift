package com.example.aidigitalwardrobe.datamapperlayer.user;

import com.example.aidigitalwardrobe.dataaccesslayer.user.User;
import com.example.aidigitalwardrobe.presentationlayer.user.UserRegistrationRequest;
import com.example.aidigitalwardrobe.presentationlayer.user.UserResponseModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring") // Generates a Spring Bean
public interface UserRegistrationMapper {

    @Mapping(source = "supabaseUserId", target = "userIdentifier.userId")
    @Mapping(target ="username", source = "username")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userImagePath", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "clothingItems", ignore = true)
    User requestToEntity(UserRegistrationRequest request);
}