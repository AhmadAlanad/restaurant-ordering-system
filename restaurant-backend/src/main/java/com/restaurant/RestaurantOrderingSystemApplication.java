package com.restaurant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class RestaurantOrderingSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestaurantOrderingSystemApplication.class, args);
	}

}
