package com.example.ecommerce.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "requests")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SellersRequest {
    @Id
    private String id;
    private String name;
    private String email;
    private String pic;
    private String password;
    private String role;
}
