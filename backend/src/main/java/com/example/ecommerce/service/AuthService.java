package com.example.ecommerce.service;

import com.example.ecommerce.dto.ReqRes;
import com.example.ecommerce.model.OurUsers;
import com.example.ecommerce.model.Produit;
import com.example.ecommerce.repository.OurUserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class AuthService {

    @Autowired
    private OurUserRepo ourUserRepo;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    public ReqRes signUp(ReqRes registrationRequest){
        ReqRes resp = new ReqRes();
        try {
            OurUsers ourUsers = new OurUsers();
            ourUsers.setName(registrationRequest.getName());
            ourUsers.setEmail(registrationRequest.getEmail());
            ourUsers.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            ourUsers.setRole(registrationRequest.getRole());
            ourUsers.setPic(registrationRequest.getPic());
            OurUsers ourUserResult = ourUserRepo.save(ourUsers);
            if (ourUserResult != null) {
                resp.setOurUsers(ourUserResult);
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(200);
            }
        }catch (Exception e){
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public ReqRes signIn(ReqRes signinRequest){
        ReqRes response = new ReqRes();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getEmail(),signinRequest.getPassword()));
            var user = ourUserRepo.findByEmail(signinRequest.getEmail()).orElseThrow();
            System.out.println("USER IS: "+ user);
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setOurUsers(user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hr");
            response.setMessage("Successfully Signed In");
        }catch (Exception e){
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    public ReqRes refreshToken(ReqRes refreshTokenReqiest){
        ReqRes response = new ReqRes();
        String ourEmail = jwtUtils.extractUsername(refreshTokenReqiest.getToken());
        OurUsers users = ourUserRepo.findByEmail(ourEmail).orElseThrow();
        if (jwtUtils.isTokenValid(refreshTokenReqiest.getToken(), users)) {
            var jwt = jwtUtils.generateToken(users);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshTokenReqiest.getToken());
            response.setExpirationTime("24Hr");
            response.setMessage("Successfully Refreshed Token");
        }
        response.setStatusCode(500);
        return response;
    }

    public OurUsers getUserById(String userId) {
        return ourUserRepo.findById(userId).orElse(null);
    }
    public OurUsers updateUser(String userId, Produit prod) {
        boolean productExists = false;
        OurUsers existingUser = ourUserRepo.findById(userId).orElse(null);
        if (existingUser != null) {
            // Mettez à jour les champs de l'utilisateur existant avec les nouvelles valeurs
            // existingUser.setEmail(updatedUser.getEmail());
            // existingUser.setPassword(updatedUser.getPassword());
            // Ajoutez d'autres champs que vous souhaitez mettre à jour

            List<Produit> userProducts = existingUser.getProducts();
            if (userProducts == null) {
                userProducts = new ArrayList<>(); // Initialiser la liste si elle est nulle
            }
            if (userProducts != null) {
                // Vérifier si le produit existe déjà dans la liste
                for (Produit existingProduct : userProducts) {
                    if (existingProduct.getId().equals(prod.getId())) {
                        productExists = true;
                        break;
                    }
                }
            }
            if(!productExists){
                userProducts.add(prod);
                existingUser.setProducts(userProducts);
                return ourUserRepo.save(existingUser);
            }
        }
        return null;
    }

    public OurUsers deleteProductFromList(String userId, Produit prod) {
        OurUsers existingUser = ourUserRepo.findById(userId).orElse(null);
        if (existingUser != null) {
            List<Produit> userProducts = existingUser.getProducts();
            if (userProducts != null) {
                userProducts.remove(prod); // Supprimer le produit de la liste s'il existe
                existingUser.setProducts(userProducts); // Mettre à jour la liste des produits de l'utilisateur
                return ourUserRepo.save(existingUser); // Sauvegarder et retourner l'utilisateur mis à jour
            }
        }
        return null; // Retourner null si l'utilisateur n'existe pas ou s'il n'a pas de produits
    }

    public void deleteUser(String userId) {
        ourUserRepo.deleteById(userId);
    }

    public List<OurUsers> getUsersByRoleSeller() {
        return ourUserRepo.findByRole("seller") ;
    }


}
