package com.restaurant.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ImageResourceConfig
        implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(
            ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/images/**")
                .addResourceLocations(
                        // Temporary uploaded images
                        "file:restaurant-backend/uploads/temp/",

                        // Permanent uploaded images
                        "file:restaurant-backend/uploads/images/",

                        // Existing project images
                        "file:restaurant-backend/src/main/resources/static/images/"
                );
    }
}