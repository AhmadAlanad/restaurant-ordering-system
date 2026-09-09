package com.restaurant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.PathVariable;

import com.restaurant.dto.CategorySalesDTO;
import com.restaurant.dto.CategoryMenuItemSalesDTO;

import com.restaurant.dto.SalesReportDTO;
import com.restaurant.service.SalesReportService;

@RestController
@RequestMapping("/api/reports")
public class SalesReportController {

    @Autowired
    private SalesReportService salesReportService;

    @GetMapping
    public SalesReportDTO getSalesReport(

            @RequestParam(required = false) LocalDate from,

            @RequestParam(required = false) LocalDate to) {

        return salesReportService.getSalesReport(
                from,
                to);

    }

    @GetMapping("/categories")
    public List<CategorySalesDTO> getCategorySales(

            @RequestParam(required = false) LocalDate from,

            @RequestParam(required = false) LocalDate to) {

        return salesReportService.getCategorySales(
                from,
                to);

    }

    @GetMapping("/categories/{categoryId}")
    public List<CategoryMenuItemSalesDTO> getCategoryMenuItemSales(

            @PathVariable UUID categoryId,

            @RequestParam(required = false) LocalDate from,

            @RequestParam(required = false) LocalDate to) {

        return salesReportService.getCategoryMenuItemSales(
                categoryId,
                from,
                to);

    }

}