package com.example.ecommerce.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.ecommerce.model.Article;
import com.example.ecommerce.service.ArticleService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;



@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ArticleControlller {
    private final ArticleService articleService;

     @GetMapping
    public List<Article> getAllArticles() {
        return articleService.getAllArticles();
    }
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addArticle(@RequestParam("title") String title, @RequestParam("description") String description, @RequestParam("quantity") String quantity,  @RequestParam("file") MultipartFile file, @RequestParam("price") String price){
        articleService.addArticle(title,description,quantity,price, file);
    }
    
}
