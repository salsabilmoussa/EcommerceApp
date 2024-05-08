package com.example.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommerce.model.SellersRequest;
import com.example.ecommerce.repository.SellerRepository;

@Service
public class RequestService {
    private final SellerRepository sellerRepository;

    @Autowired
    public RequestService(SellerRepository sellerRepository) {
        this.sellerRepository = sellerRepository;
    }

    public SellersRequest addSeller(SellersRequest seller) {
        return sellerRepository.save(seller);
    }

     public List<SellersRequest> getAllSellerRequests() {
        return sellerRepository.findAll();
    }

    public void deleteSeller(String id) {
        sellerRepository.deleteById(id);
    }

    public SellersRequest getSellerById(String id) {
        return sellerRepository.findById(id)
                .orElse(null); 
    }
}
