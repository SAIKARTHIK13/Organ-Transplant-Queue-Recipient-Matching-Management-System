package com.karthik.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "recipients")
@Data
public class Recipient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String registrationNumber;
    private String name;
    private Integer age;
    private String bloodGroup;
    private String organNeeded;
    private Integer urgencyScore; // 1-10
    private LocalDate waitingSince;
    private String medicalCondition;
    private String tissueType;
    private Double height;
    private Double weight;
    private String status; // WAITING / MATCHED / TRANSPLANTED / REMOVED / DECEASED

    @PrePersist
    public void prePersist() {
        if (waitingSince == null) waitingSince = LocalDate.now();
        if (status == null) status = "WAITING";
    }
}
