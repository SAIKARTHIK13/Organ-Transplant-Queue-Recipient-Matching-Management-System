package com.karthik.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "transplant_records")
@Data
public class TransplantRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long recipientId;
    private Long donorId;
    private Long organId;
    private LocalDate transplantDate;
    private String performedBy;
    private String outcome; // SUCCESS / FAILURE / COMPLICATION
    private String followUpStatus;
    private LocalDate dischargeDate;

    @PrePersist
    public void prePersist() {
        if (transplantDate == null) transplantDate = LocalDate.now();
    }
}
