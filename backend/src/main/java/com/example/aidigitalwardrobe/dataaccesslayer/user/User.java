package com.example.aidigitalwardrobe.dataaccesslayer.user;

import com.example.aidigitalwardrobe.dataaccesslayer.clothingitem.ClothingItem;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Embedded
    private UserIdentifier userIdentifier;

    private String username;

    private String userImagePath;

    @Builder.Default
    private boolean isActive = true;

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<ClothingItem> clothingItems;
}
