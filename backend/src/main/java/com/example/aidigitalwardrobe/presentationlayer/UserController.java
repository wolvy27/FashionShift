package com.example.aidigitalwardrobe.presentationlayer;

import com.example.aidigitalwardrobe.businesslayer.UserService;
import com.example.aidigitalwardrobe.dataaccesslayer.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<User> registerNewUser(@RequestBody UserRegistrationRequest request) {

        User newUser = userService.registerUser(request);

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
}