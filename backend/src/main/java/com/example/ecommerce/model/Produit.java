package com.example.ecommerce.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "produits")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Produit {
    @Id
    private String id;
    private String description;
    private String title;
    private String price;
    private String quantity;
    private String imageUrl;

}
