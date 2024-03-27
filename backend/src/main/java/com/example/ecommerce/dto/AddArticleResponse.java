package com.example.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddArticleResponse {
    private String title;
    private String description;
    private Float price;
    private Integer quantity;
    private String imageUrl;

    
}
