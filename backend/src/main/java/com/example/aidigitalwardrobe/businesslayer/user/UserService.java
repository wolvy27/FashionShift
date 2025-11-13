package com.example.aidigitalwardrobe.businesslayer.user;

import com.example.aidigitalwardrobe.dataaccesslayer.user.User;
import com.example.aidigitalwardrobe.presentationlayer.user.UserRegistrationRequest;
import com.example.aidigitalwardrobe.presentationlayer.user.UserRequestModel;
import com.example.aidigitalwardrobe.presentationlayer.user.UserResponseModel;

import java.util.List;

public interface UserService {
    UserResponseModel registerUser(UserRegistrationRequest request);
    List<UserResponseModel> getAllUsers();
    UserResponseModel getUserByUserId(String UserId);
    UserResponseModel updateUser(String UserId, UserRequestModel newUserData);
    UserResponseModel deleteUserById(String UserId);
}
