package com.restaurant.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.restaurant.security.JwtAuthenticationFilter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.HttpMethod;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            // Disable CSRF because this is a REST API
            .csrf(csrf -> csrf.disable())
            
            .cors(cors -> {})

            // JWT authentication is stateless
            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            // Endpoint permissions
            .authorizeHttpRequests(auth -> auth

                // Authentication endpoints
                .requestMatchers(
                    "/api/users/register",
                    "/api/users/login",
                    "/images/**"
                ).permitAll()

                // Swagger / OpenAPI
                .requestMatchers(
                    "/swagger-ui/**",
                    "/v3/api-docs/**"
                ).permitAll()
                
                .requestMatchers(
                	    "/api/dashboard/**",
                	    "/api/reports/**"
                	).hasRole("ADMIN")

                	.requestMatchers(
                	    "/api/orders/*/accept",
                	    "/api/orders/*/reject",
                	    "/api/orders/*/preparing",
                	    "/api/orders/*/ready",
                	    "/api/orders/*/delivered"
                	).hasRole("ADMIN")
                	
                	.requestMatchers(
                		    HttpMethod.POST,
                		    "/api/categories"
                		).hasRole("ADMIN")

                		.requestMatchers(
                		    HttpMethod.PUT,
                		    "/api/categories/*"
                		).hasRole("ADMIN")

                		.requestMatchers(
                		    HttpMethod.POST,
                		    "/api/menu-items"
                		).hasRole("ADMIN")

                		.requestMatchers(
                		    HttpMethod.PUT,
                		    "/api/menu-items/*"
                		).hasRole("ADMIN")

                		.requestMatchers(
                		    HttpMethod.PUT,
                		    "/api/menu-items/*/toggle"
                		).hasRole("ADMIN")

                		.requestMatchers(
                		    HttpMethod.POST,
                		    "/api/menu-items/*/options"
                		).hasRole("ADMIN")

                		.requestMatchers(
                		    HttpMethod.PUT,
                		    "/api/menu-items/*/options/*"
                		).hasRole("ADMIN")

                		.requestMatchers(
                		    HttpMethod.DELETE,
                		    "/api/menu-items/*/options/*"
                		).hasRole("ADMIN")

                // Everything else requires authentication
                .anyRequest().authenticated()
            )

            // Run JWT filter before Spring's username/password filter
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}