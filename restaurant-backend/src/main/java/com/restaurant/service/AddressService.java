package com.restaurant.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.dto.AddressRequestDTO;
import com.restaurant.dto.AddressResponseDTO;
import com.restaurant.entity.Address;
import com.restaurant.entity.User;
import com.restaurant.exception.ResourceNotFoundException;
import com.restaurant.repository.AddressRepository;
import com.restaurant.repository.UserRepository;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;


    // Add a new address
    public AddressResponseDTO addAddress(
            Long userId,
            AddressRequestDTO request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));


        Address address = new Address();

        address.setLabel(request.getLabel());
        address.setDescription(request.getDescription());
        address.setLatitude(request.getLatitude());
        address.setLongitude(request.getLongitude());
        address.setUser(user);


        Address savedAddress =
                addressRepository.save(address);


        return convertToDTO(savedAddress);
    }


    // Get all addresses of a customer
    public List<AddressResponseDTO> getUserAddresses(
            Long userId) {

        List<Address> addresses =
                addressRepository.findByUserId(userId);


        return addresses.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    // Delete an address
    public void deleteAddress(
            Long userId,
            Long addressId) {

        Address address =
                addressRepository.findById(addressId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Address not found"));


        // Make sure the address belongs to this user
        if (!address.getUser().getId().equals(userId)) {

            throw new RuntimeException(
                    "You cannot delete this address");

        }


        addressRepository.delete(address);
    }


    // Convert Entity → DTO
    private AddressResponseDTO convertToDTO(
            Address address) {

        AddressResponseDTO response =
                new AddressResponseDTO();

        response.setId(address.getId());

        response.setLabel(address.getLabel());
        
        response.setDescription(address.getDescription());

        response.setLatitude(
                address.getLatitude());

        response.setLongitude(
                address.getLongitude());

        return response;
    }

}