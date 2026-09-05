package com.restaurant.dto;

public class DashboardDTO {

    private long pendingOrders;

    private long acceptedOrders;

    private long rejectedOrders;

    private long todayOrders;


    public DashboardDTO() {

    }


    public long getPendingOrders() {

        return pendingOrders;

    }

    public void setPendingOrders(long pendingOrders) {

        this.pendingOrders = pendingOrders;

    }


    public long getAcceptedOrders() {

        return acceptedOrders;

    }

    public void setAcceptedOrders(long acceptedOrders) {

        this.acceptedOrders = acceptedOrders;

    }


    public long getRejectedOrders() {

        return rejectedOrders;

    }

    public void setRejectedOrders(long rejectedOrders) {

        this.rejectedOrders = rejectedOrders;

    }


    public long getTodayOrders() {

        return todayOrders;

    }

    public void setTodayOrders(long todayOrders) {

        this.todayOrders = todayOrders;

    }

}
