package com.dmart.dto;

import com.dmart.enums.FulfillmentType;

import java.time.LocalDate;

public class OrderRequestDto {
    private FulfillmentType fulfillmentType;
    private Long addressId;
    private LocalDate scheduledDate;
    private String scheduledTime;

    // Getters and setters
    public FulfillmentType getFulfillmentType() { return fulfillmentType; }
    public void setFulfillmentType(FulfillmentType fulfillmentType) { this.fulfillmentType = fulfillmentType; }
    public Long getAddressId() { return addressId; }
    public void setAddressId(Long addressId) { this.addressId = addressId; }
    public LocalDate getScheduledDate() { return scheduledDate; }
    public void setScheduledDate(LocalDate scheduledDate) { this.scheduledDate = scheduledDate; }
    public String getScheduledTime() { return scheduledTime; }
    public void setScheduledTime(String scheduledTime) { this.scheduledTime = scheduledTime; }
}
