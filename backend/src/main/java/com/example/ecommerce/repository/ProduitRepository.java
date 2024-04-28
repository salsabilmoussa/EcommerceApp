package com.example.ecommerce.repository;

import com.example.ecommerce.model.Produit;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProduitRepository extends MongoRepository<Produit, String> {
    // Vous pouvez ajouter des méthodes personnalisées si nécessaire
}
