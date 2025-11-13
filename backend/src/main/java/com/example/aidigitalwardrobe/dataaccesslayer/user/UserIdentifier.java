package com.example.aidigitalwardrobe.dataaccesslayer.user;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Embeddable
@Data
@NoArgsConstructor
public class UserIdentifier {
    private String userId;

    public UserIdentifier(String userId) {
        this.userId = userId;
    }
}
