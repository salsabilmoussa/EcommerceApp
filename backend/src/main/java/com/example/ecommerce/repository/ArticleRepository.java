package com.example.ecommerce.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.ecommerce.model.Article;

public interface ArticleRepository extends MongoRepository<Article, String> {

    
} 