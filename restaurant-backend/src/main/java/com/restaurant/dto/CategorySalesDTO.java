package com.restaurant.dto;

import java.util.UUID;

public class CategorySalesDTO {

    private UUID categoryId;
    private String categoryName;
    private long quantitySold;
    private double totalSales;

    public CategorySalesDTO() {
    }

    public CategorySalesDTO(
            UUID categoryId,
            String categoryName,
            long quantitySold,
            double totalSales) {

        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.quantitySold = quantitySold;
        this.totalSales = totalSales;
    }

    public UUID getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(UUID categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public long getQuantitySold() {
        return quantitySold;
    }

    public void setQuantitySold(long quantitySold) {
        this.quantitySold = quantitySold;
    }

    public double getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(double totalSales) {
        this.totalSales = totalSales;
    }
}
