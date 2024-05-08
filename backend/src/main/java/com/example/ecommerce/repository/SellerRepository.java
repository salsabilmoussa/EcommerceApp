package com.example.ecommerce.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.ecommerce.model.SellersRequest;

public interface SellerRepository extends MongoRepository<SellersRequest, String>{
    
}
