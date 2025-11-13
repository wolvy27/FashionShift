package com.example.aidigitalwardrobe.businesslayer;

import com.example.aidigitalwardrobe.dataaccesslayer.user.User;
import com.example.aidigitalwardrobe.presentationlayer.UserRegistrationRequest;
import com.example.aidigitalwardrobe.presentationlayer.UserResponseModel;

import java.util.List;

public interface UserService {
    User registerUser(UserRegistrationRequest request);
    List<UserResponseModel> getAllUsers();
    UserResponseModel getUserByUserId();
}
