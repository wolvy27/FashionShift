package com.example.aidigitalwardrobe.dataaccesslayer.clothingitem;


import com.example.aidigitalwardrobe.dataaccesslayer.user.User;
import com.example.aidigitalwardrobe.dataaccesslayer.user.UserIdentifier;
import jakarta.persistence.*;
import lombok.*;

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

    @Enumerated(EnumType.STRING)
    private Style style;

    @Enumerated(EnumType.STRING)
    private WeatherTag weatherTag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "id"
    )
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;
}
