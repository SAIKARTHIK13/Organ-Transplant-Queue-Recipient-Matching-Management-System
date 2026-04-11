package com.karthik.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "donors")
@Data
public class Donor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String donorType; // LIVING / DECEASED
    private String bloodGroup;
    private String tissueType;
    private Integer age;
    private String causeOfDeath;
    private LocalDate donationDate;
    private String hospital;
    
    @PrePersist
    public void prePersist() {
        if (donationDate == null) donationDate = LocalDate.now();
    }
}
