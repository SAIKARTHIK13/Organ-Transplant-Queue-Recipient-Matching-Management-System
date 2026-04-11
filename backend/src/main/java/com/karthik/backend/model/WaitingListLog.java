package com.karthik.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "waiting_list_logs")
@Data
public class WaitingListLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long recipientId;
    private String action; // ADDED / PRIORITY_UPDATED / REMOVED / MATCHED
    private Integer previousUrgencyScore;
    private Integer newUrgencyScore;
    private String performedBy;
    private LocalDateTime timestamp;

    @PrePersist
    public void prePersist() {
        if (timestamp == null) timestamp = LocalDateTime.now();
    }
}
