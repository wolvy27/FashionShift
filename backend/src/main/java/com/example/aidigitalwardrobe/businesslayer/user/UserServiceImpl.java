package com.example.aidigitalwardrobe.businesslayer.user;

import com.example.aidigitalwardrobe.dataaccesslayer.user.User;
import com.example.aidigitalwardrobe.dataaccesslayer.user.UserRepository;
import com.example.aidigitalwardrobe.datamapperlayer.user.UserRegistrationMapper;
import com.example.aidigitalwardrobe.datamapperlayer.user.UserRequestMapper;
import com.example.aidigitalwardrobe.datamapperlayer.user.UserResponseMapper;
import com.example.aidigitalwardrobe.presentationlayer.user.UserRegistrationRequest;
import com.example.aidigitalwardrobe.presentationlayer.user.UserRequestModel;
import com.example.aidigitalwardrobe.presentationlayer.user.UserResponseModel;
import com.example.aidigitalwardrobe.utils.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.aidigitalwardrobe.utils.GlobalControllerExceptionHandler;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserRegistrationMapper registrationMapper;
    private final UserRequestMapper requestMapper;
    private final UserResponseMapper responseMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           UserRegistrationMapper registrationMapper,
                           UserRequestMapper requestMapper,
                           UserResponseMapper responseMapper) {
        this.userRepository = userRepository;
        this.registrationMapper = registrationMapper;
        this.requestMapper = requestMapper;
        this.responseMapper = responseMapper;
    }


    @Override
    public UserResponseModel registerUser(UserRegistrationRequest request) {
        User newUser = registrationMapper.requestToEntity(request);

        User savedUser = userRepository.save(newUser);

        return responseMapper.entityToResponseModel(savedUser);
    }

    @Override
    public List<UserResponseModel> getAllUsers() {
        List<User> users = userRepository.findAll();
        return responseMapper.entityListToResponseModelList(users);
    }

    @Override
    public UserResponseModel getUserByUserId(String userId) {
        User user = userRepository.findUserByUserIdentifier_UserId(userId);
        if (user == null) {
            throw new NotFoundException("UserId not found: " + userId);
        }
        return responseMapper.entityToResponseModel(user);
    }

    @Override
    public UserResponseModel updateUser(String userId, UserRequestModel requestModel) {
        User foundUser = userRepository.findUserByUserIdentifier_UserId(userId);
        if (foundUser == null) {
            throw new NotFoundException("UserId not found: " + userId);
        }
        User updatedUser = requestMapper.requestModelToEntity(requestModel);

        updatedUser.setId(foundUser.getId());
        updatedUser.setUserIdentifier(foundUser.getUserIdentifier());

        User savedUser = userRepository.save(updatedUser);

        return responseMapper.entityToResponseModel(savedUser);
    }

    @Override
    public UserResponseModel deleteUserById(String userId) {
        User foundUser = userRepository.findUserByUserIdentifier_UserId(userId);
        if (foundUser == null) {
            throw new NotFoundException("UserId not found: " + userId);
        }

        foundUser.setActive(false);

        User deactivatedUser = userRepository.save(foundUser);

        return responseMapper.entityToResponseModel(deactivatedUser);
    }

}
