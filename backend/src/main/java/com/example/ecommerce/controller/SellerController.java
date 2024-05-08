package com.example.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.model.SellersRequest;
import com.example.ecommerce.service.RequestService;

@RestController
@RequestMapping("/api/sellers")
@CrossOrigin(origins = "*")
public class SellerController {
    private final RequestService requestService;

    @Autowired
    public SellerController(RequestService requestService) {
        this.requestService = requestService;
    }

    @PostMapping("/")
    public SellersRequest addSeller(@RequestBody SellersRequest seller) {
        return requestService.addSeller(seller);
    }

     @GetMapping("/")
    public List<SellersRequest> getAllSellerRequests() {
        return requestService.getAllSellerRequests();
    }

    @DeleteMapping("/{id}")
    public void deleteSeller(@PathVariable("id") String id) {
        requestService.deleteSeller(id);
    }

    @GetMapping("/{id}") 
    public SellersRequest getSellerById(@PathVariable("id") String id) {
        return requestService.getSellerById(id);
    }

}
