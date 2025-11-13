package com.example.aidigitalwardrobe.businesslayer;

import com.example.aidigitalwardrobe.dataaccesslayer.user.User;
import com.example.aidigitalwardrobe.dataaccesslayer.user.UserIdentifier;
import com.example.aidigitalwardrobe.dataaccesslayer.user.UserRepository;
import com.example.aidigitalwardrobe.presentationlayer.user.UserRegistrationRequest;
import com.example.aidigitalwardrobe.presentationlayer.user.UserResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(UserRegistrationRequest request) {
        UserIdentifier userIdentifier = new UserIdentifier(request.supabaseUserId());

        User newUser = User.builder()
                .userIdentifier(userIdentifier)
                .username(request.username())
                .userImagePath(null)
                .isActive(true)
                .build();

        return userRepository.save(newUser);
    }

    @Override
    public List<UserResponseModel> getAllUsers() {
        return List.of();
    }

    @Override
    public UserResponseModel getUserByUserId() {
        return null;
    }

}
