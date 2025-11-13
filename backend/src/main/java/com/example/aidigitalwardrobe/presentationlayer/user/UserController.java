package com.example.aidigitalwardrobe.presentationlayer.user;

import com.example.aidigitalwardrobe.businesslayer.user.UserService;
import com.example.aidigitalwardrobe.dataaccesslayer.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseModel> registerNewUser(@RequestBody UserRegistrationRequest request) {
        UserResponseModel newUser = userService.registerUser(request);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<UserResponseModel>> getAllUsers() {
        List<UserResponseModel> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponseModel> getUserByUserId(@PathVariable String userId) {
        UserResponseModel user = userService.getUserByUserId(userId);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserResponseModel> updateUser(
            @PathVariable String userId,
            @RequestBody UserRequestModel requestModel) {

        UserResponseModel updatedUser = userService.updateUser(userId, requestModel);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<UserResponseModel> deleteUser(@PathVariable String userId) {
        // As we decided, this returns the updated user model
        UserResponseModel deactivatedUser = userService.deleteUserById(userId);
        return ResponseEntity.ok(deactivatedUser); // Returns 200 OK
    }
}