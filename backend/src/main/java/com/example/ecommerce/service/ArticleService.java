package com.example.ecommerce.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import com.example.ecommerce.dto.AddArticleResponse;
import com.example.ecommerce.model.Article;
import java.io.IOException;
import java.io.File;
import com.example.ecommerce.repository.ArticleRepository;
import java.lang.Float;

@Service
public class ArticleService {
    @Value("${uploadDirectory}")
    private String uploadDirectory;

    private final ArticleRepository articleRepository;


    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public AddArticleResponse addArticle(String title, String description,String quantity, String price, MultipartFile multipartFile) {
        Article article = new Article();
        if (!multipartFile.isEmpty()) {
            try {
                // Vérifiez si le répertoire de téléchargement existe, sinon créez-le
                File directory = new File(uploadDirectory);
                if (!directory.exists()) {
                    if (!directory.mkdirs()) {
                        throw new RuntimeException("Impossible de créer le répertoire de téléchargement.");
                    }
                }

                // Récupérez le nom du fichier
                String fileName = multipartFile.getOriginalFilename();

                // Définir le chemin complet pour enregistrer le fichier
                String filePath = uploadDirectory + File.separator + fileName;

                // Enregistrez le fichier sur le système de fichiers du serveur
                multipartFile.transferTo(new File(filePath));

                // Créez une URL relative pour le fichier téléchargé
                String imgUrl = "assets/uploads/" + fileName;

                article.setImageUrl(imgUrl);


            } catch (IOException e) {
                throw new RuntimeException("Impossible de sauvegarder le fichier : " + e.getMessage());
            }
        }
        
        article.setDescription(description);
        article.setTitle(title);
        article.setQuantity(Integer.parseInt(quantity));
        article.setPrice(Float.parseFloat(price));
        var savedArticle = articleRepository.save(article);
        return new AddArticleResponse(savedArticle.getTitle(), savedArticle.getDescription(), savedArticle.getPrice(), savedArticle.getQuantity(), savedArticle.getImageUrl());


    }

}
