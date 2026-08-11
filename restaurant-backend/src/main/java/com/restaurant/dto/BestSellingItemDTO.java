package com.restaurant.dto;

public class BestSellingItemDTO {

    private String itemName;
    private long totalSold;

    public BestSellingItemDTO() {
    }

    public BestSellingItemDTO(String itemName, long totalSold) {
        this.itemName = itemName;
        this.totalSold = totalSold;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public long getTotalSold() {
        return totalSold;
    }

    public void setTotalSold(long totalSold) {
        this.totalSold = totalSold;
    }
}