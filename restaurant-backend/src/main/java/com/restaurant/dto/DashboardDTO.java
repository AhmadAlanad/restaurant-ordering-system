package com.restaurant.dto;


public class DashboardDTO {

    private long totalOrders;
    private long pendingOrders; 
    private long todayOrders;
    

    public DashboardDTO() {
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public long getPendingOrders() {
        return pendingOrders;
    }

    public void setPendingOrders(long pendingOrders) {
        this.pendingOrders = pendingOrders;
    }

    
    public long getTodayOrders() {
        return todayOrders;
    }

    public void setTodayOrders(long todayOrders) {
        this.todayOrders = todayOrders;
    }

    

}