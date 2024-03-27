package com.example.ecommerce.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(value = "Article")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Article {
    @Id
    private String id;
    private String description;
    private String title;
    private Float price;
    private Integer quantity;
    private String imageUrl;

}
