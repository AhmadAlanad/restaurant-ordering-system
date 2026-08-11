package com.restaurant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurant.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findByUserId(Long userId);

}