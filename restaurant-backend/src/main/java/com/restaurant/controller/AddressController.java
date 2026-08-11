package com.restaurant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.restaurant.dto.AddressRequestDTO;
import com.restaurant.dto.AddressResponseDTO;
import com.restaurant.service.AddressService;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    @Autowired
    private AddressService addressService;


    @PostMapping("/{userId}")
    public AddressResponseDTO addAddress(
            @PathVariable Long userId,
            @RequestBody AddressRequestDTO request) {

        return addressService.addAddress(
                userId,
                request);
    }


    @GetMapping("/{userId}")
    public List<AddressResponseDTO> getUserAddresses(
            @PathVariable Long userId) {

        return addressService.getUserAddresses(
                userId);
    }


    @DeleteMapping("/{userId}/{addressId}")
    public void deleteAddress(
            @PathVariable Long userId,
            @PathVariable Long addressId) {

        addressService.deleteAddress(
                userId,
                addressId);
    }

}