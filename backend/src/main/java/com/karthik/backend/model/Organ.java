package com.karthik.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "organs")
@Data
public class Organ {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long donorId;
    private String organType; // KIDNEY / LIVER / HEART / etc.
    private String bloodGroup;
    private String tissueType;
    private LocalDateTime preservationStartTime;
    private LocalDateTime preservationEndTime;
    private String status; // AVAILABLE / OFFERED / TRANSPLANTED / EXPIRED / DISCARDED
    
    @PrePersist
    public void prePersist() {
        if (status == null) status = "AVAILABLE";
        if (preservationStartTime == null) preservationStartTime = LocalDateTime.now();
    }
}
