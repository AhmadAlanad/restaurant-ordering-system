package com.restaurant.dto;

import java.util.List;


public class SalesReportDTO {

    private double totalRevenue;
    private double todayRevenue;
    private double weekRevenue;
    private double monthRevenue;

    private long totalOrders;
    private long acceptedOrders;
    private long pendingOrders;
    private long rejectedOrders;
    private List<BestSellingItemDTO> bestSellingItems;

    public SalesReportDTO() {
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public double getTodayRevenue() {
        return todayRevenue;
    }

    public void setTodayRevenue(double todayRevenue) {
        this.todayRevenue = todayRevenue;
    }

    public double getWeekRevenue() {
        return weekRevenue;
    }

    public void setWeekRevenue(double weekRevenue) {
        this.weekRevenue = weekRevenue;
    }

    public double getMonthRevenue() {
        return monthRevenue;
    }

    public void setMonthRevenue(double monthRevenue) {
        this.monthRevenue = monthRevenue;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public long getAcceptedOrders() {
        return acceptedOrders;
    }

    public void setAcceptedOrders(long acceptedOrders) {
        this.acceptedOrders = acceptedOrders;
    }

    public long getPendingOrders() {
        return pendingOrders;
    }

    public void setPendingOrders(long pendingOrders) {
        this.pendingOrders = pendingOrders;
    }

    public long getRejectedOrders() {
        return rejectedOrders;
    }

    public void setRejectedOrders(long rejectedOrders) {
        this.rejectedOrders = rejectedOrders;
    }

    public List<BestSellingItemDTO> getBestSellingItems() {
        return bestSellingItems;
    }

    public void setBestSellingItems(
            List<BestSellingItemDTO> bestSellingItems) {

        this.bestSellingItems = bestSellingItems;
    }

}