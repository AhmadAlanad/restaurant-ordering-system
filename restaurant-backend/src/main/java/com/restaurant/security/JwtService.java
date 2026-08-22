package com.restaurant.security;

import javax.crypto.SecretKey;
import java.util.Date;

import org.springframework.stereotype.Service;

import org.springframework.security.core.userdetails.UserDetails;
import com.restaurant.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;

    private final SecretKey secretKey = Keys.secretKeyFor(
            SignatureAlgorithm.HS256
    );


    public String generateToken(User user) {

        return Jwts.builder()
                .subject(user.getEmail())
                .claim("userId", user.getId())
                .claim("role", user.getRole().name())
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + EXPIRATION_TIME
                        )
                )
                .signWith(secretKey)
                .compact();
    }


    public String extractEmail(String token) {

        return extractAllClaims(token)
                .getSubject();
    }


    public Long extractUserId(String token) {

        return extractAllClaims(token)
                .get("userId", Long.class);
    }


    public String extractRole(String token) {

        return extractAllClaims(token)
                .get("role", String.class);
    }


    public boolean isTokenValid(
            String token,
            UserDetails userDetails) {

        String email = extractEmail(token);

        return email.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }


    private boolean isTokenExpired(String token) {

        return extractAllClaims(token)
                .getExpiration()
                .before(new Date());
    }


    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}