package com.karthik.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "allocation_offers")
@Data
public class AllocationOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long organId;
    private Long recipientId;
    private String offeredBy;
    private Integer offerSequence;
    private String status; // PENDING / ACCEPTED / REJECTED / EXPIRED
    private LocalDateTime offeredAt;
    private LocalDateTime respondedAt;

    @PrePersist
    public void prePersist() {
        if (offeredAt == null) offeredAt = LocalDateTime.now();
        if (status == null) status = "PENDING";
    }
}
