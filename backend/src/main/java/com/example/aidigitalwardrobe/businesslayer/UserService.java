package com.example.aidigitalwardrobe.businesslayer;

import com.example.aidigitalwardrobe.dataaccesslayer.user.User;
import com.example.aidigitalwardrobe.presentationlayer.UserRegistrationRequest;

public interface UserService {
    User registerUser(UserRegistrationRequest request);
}
