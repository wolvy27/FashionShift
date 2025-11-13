package com.example.aidigitalwardrobe.presentationlayer;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestModel {

    private String username;
    private String userImagePath;
    private boolean isActive;
}
