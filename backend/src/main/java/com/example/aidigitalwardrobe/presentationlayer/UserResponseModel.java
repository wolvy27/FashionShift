package com.example.aidigitalwardrobe.presentationlayer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseModel {

    private String userId;
    private String username;
    private String userImagePath;
    private boolean isActive;
}
