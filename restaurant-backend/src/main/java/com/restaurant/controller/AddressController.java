package com.restaurant.controller;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.restaurant.dto.AddressRequestDTO;
import com.restaurant.dto.AddressResponseDTO;
import com.restaurant.service.AddressService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    @Autowired
    private AddressService addressService;


    @PostMapping("/{userId}")
    public AddressResponseDTO addAddress(
            @PathVariable UUID userId,
            @Valid @RequestBody AddressRequestDTO request) {

        return addressService.addAddress(
                userId,
                request);
    }


    @GetMapping("/{userId}")
    public List<AddressResponseDTO> getUserAddresses(
            @PathVariable UUID userId) {

        return addressService.getUserAddresses(
                userId);
    }


    @DeleteMapping("/{userId}/{addressId}")
    public void deleteAddress(
            @PathVariable UUID userId,
            @PathVariable UUID addressId) {

        addressService.deleteAddress(
                userId,
                addressId);
    }

}