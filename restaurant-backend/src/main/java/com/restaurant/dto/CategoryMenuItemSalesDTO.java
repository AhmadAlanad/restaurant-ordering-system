package com.restaurant.dto;

import java.util.UUID;

public class CategoryMenuItemSalesDTO {

    private UUID menuItemId;
    private String menuItemName;
    private long quantitySold;
    private double totalSales;

    public CategoryMenuItemSalesDTO() {
    }

    public CategoryMenuItemSalesDTO(
            UUID menuItemId,
            String menuItemName,
            long quantitySold,
            double totalSales) {

        this.menuItemId = menuItemId;
        this.menuItemName = menuItemName;
        this.quantitySold = quantitySold;
        this.totalSales = totalSales;
    }

    public UUID getMenuItemId() {
        return menuItemId;
    }

    public void setMenuItemId(UUID menuItemId) {
        this.menuItemId = menuItemId;
    }

    public String getMenuItemName() {
        return menuItemName;
    }

    public void setMenuItemName(String menuItemName) {
        this.menuItemName = menuItemName;
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
