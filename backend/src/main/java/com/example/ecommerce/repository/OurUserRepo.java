package com.example.ecommerce.repository;

import com.example.ecommerce.model.OurUsers;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface OurUserRepo extends MongoRepository<OurUsers, String> {
    Optional<OurUsers> findByEmail(String email);
}
