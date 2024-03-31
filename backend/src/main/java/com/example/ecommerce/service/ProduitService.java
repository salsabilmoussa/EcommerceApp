package com.example.ecommerce.service;

import com.example.ecommerce.model.Produit;
import com.example.ecommerce.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProduitService {
    private final ProduitRepository produitRepository;

    @Autowired
    public ProduitService(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    public Optional<Produit> getProduitById(String id) {
        return produitRepository.findById(id);
    }

    public Produit createProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    public Produit updateProduit(String id, Produit produit) {
        if (produitRepository.existsById(id)) {
            produit.setId(id);
            return produitRepository.save(produit);
        } else {
            // Handle case where produit with given ID not found, throw exception or log error
            return null;
        }
    }

    public void deleteProduit(String id) {
        produitRepository.deleteById(id);
    }
}
