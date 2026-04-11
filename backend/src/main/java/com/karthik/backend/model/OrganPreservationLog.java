package com.karthik.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "organ_preservation_logs")
@Data
public class OrganPreservationLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long organId;
    private String preservationMethod;
    private Double temperature;
    private String location;
    private LocalDateTime loggedAt;

    @PrePersist
    public void prePersist() {
        if (loggedAt == null) loggedAt = LocalDateTime.now();
    }
}
