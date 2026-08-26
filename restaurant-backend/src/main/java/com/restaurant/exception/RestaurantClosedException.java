package com.restaurant.exception;

public class RestaurantClosedException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public RestaurantClosedException(String message) {
        super(message);
    }
}