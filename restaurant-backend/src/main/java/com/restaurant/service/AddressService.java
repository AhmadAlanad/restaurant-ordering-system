package com.restaurant.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

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
    
    private User getAuthenticatedUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Authenticated user not found"));
    }


    // Add a new address
    public AddressResponseDTO addAddress(
    		UUID userId,
            AddressRequestDTO request) {

    	User user = getAuthenticatedUser();

    	if (!user.getId().equals(userId)) {

    	    throw new AccessDeniedException(
    	            "You cannot add an address for another user");
    	}


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
    		UUID userId) {
    	User authenticatedUser = getAuthenticatedUser();

    	if (!authenticatedUser.getId().equals(userId)
    	        && authenticatedUser.getRole() != com.restaurant.enums.Role.ADMIN) {

    	    throw new AccessDeniedException(
    	            "You cannot access another user's addresses");
    	}

        List<Address> addresses =
                addressRepository.findByUserId(userId);


        return addresses.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    // Delete an address
    public void deleteAddress(
    		UUID userId,
    		UUID addressId) {

        Address address =
                addressRepository.findById(addressId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Address not found"));


        // Make sure the address belongs to this user
        User authenticatedUser = getAuthenticatedUser();

        if (!authenticatedUser.getId().equals(userId)) {

            throw new AccessDeniedException(
                    "You cannot delete another user's address");
        }

        if (!address.getUser().getId().equals(userId)) {

            throw new AccessDeniedException(
                    "This address does not belong to this user");
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