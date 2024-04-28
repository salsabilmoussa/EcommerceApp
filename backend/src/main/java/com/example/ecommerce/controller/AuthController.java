package com.example.ecommerce.controller;


import com.example.ecommerce.dto.ReqRes;
import com.example.ecommerce.model.OurUsers;
import com.example.ecommerce.model.Produit;
import com.example.ecommerce.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ReqRes> signUp(@RequestBody ReqRes signUpRequest){
        return ResponseEntity.ok(authService.signUp(signUpRequest));
    }
    @PostMapping("/signin")
    public ResponseEntity<ReqRes> signIn(@RequestBody ReqRes signInRequest){
        return ResponseEntity.ok(authService.signIn(signInRequest));
    }
    @PostMapping("/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes refreshTokenRequest){
        return ResponseEntity.ok(authService.refreshToken(refreshTokenRequest));
    }
    @GetMapping("/{userId}")
    public OurUsers getUserById(@PathVariable String userId) {
        return authService.getUserById(userId);
    }
    @PutMapping("/{userId}")
    public OurUsers updateUser(@PathVariable String userId, @RequestBody Produit prod) {
        return authService.updateUser(userId, prod);
    }
    @PutMapping("/deleteProd/{userId}")
    public OurUsers deleteProductFromList(@PathVariable String userId, @RequestBody Produit prod) {
        return authService.deleteProductFromList(userId, prod);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable String userId) {
        authService.deleteUser(userId);
    }
}
