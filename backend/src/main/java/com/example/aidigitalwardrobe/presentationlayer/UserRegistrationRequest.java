package com.example.aidigitalwardrobe.presentationlayer;

public record UserRegistrationRequest(
        String supabaseUserId,
        String username
) {}
