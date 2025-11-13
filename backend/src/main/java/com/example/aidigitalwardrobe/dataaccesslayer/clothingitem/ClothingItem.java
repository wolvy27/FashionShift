package com.example.aidigitalwardrobe.dataaccesslayer.clothingitem;


import com.example.aidigitalwardrobe.dataaccesslayer.user.UserIdentifier;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "clothing_items")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClothingItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Embedded
    private ClothingItemIdentifier clothingItemIdentifier;

    @Enumerated(EnumType.STRING)
    private ClothingType clothingType;

    @Enumerated(EnumType.STRING)
    private ColorType colorType;

    private String clothingImagePath;

    @Enumerated(EnumType.STRING)
    private MaterialType materialType;
}
