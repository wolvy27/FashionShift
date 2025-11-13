package com.example.aidigitalwardrobe.presentationlayer.user;

public record UserRegistrationRequest(
        String supabaseUserId,
        String username
) {}
