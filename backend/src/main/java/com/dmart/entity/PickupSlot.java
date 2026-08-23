package com.dmart.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "pickup_slots")
public class PickupSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "slot_date", nullable = false)
    private LocalDate slotDate;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "maximum_capacity", nullable = false)
    private Integer maximumCapacity;

    @Column(name = "current_bookings", nullable = false)
    private Integer currentBookings = 0;

    @Column(nullable = false)
    private Boolean active = true;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getSlotDate() { return slotDate; }
    public void setSlotDate(LocalDate slotDate) { this.slotDate = slotDate; }
    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }
    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }
    public Integer getMaximumCapacity() { return maximumCapacity; }
    public void setMaximumCapacity(Integer maximumCapacity) { this.maximumCapacity = maximumCapacity; }
    public Integer getCurrentBookings() { return currentBookings; }
    public void setCurrentBookings(Integer currentBookings) { this.currentBookings = currentBookings; }
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
