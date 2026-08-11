package com.restaurant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.dto.SalesReportDTO;
import com.restaurant.service.SalesReportService;

@RestController
@RequestMapping("/api/reports")
public class SalesReportController {

    @Autowired
    private SalesReportService salesReportService;

    @GetMapping
    public SalesReportDTO getSalesReport() {

        return salesReportService.getSalesReport();

    }

}