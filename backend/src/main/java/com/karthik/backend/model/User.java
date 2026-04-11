package com.karthik.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String role; // ADMIN / COORDINATOR / SURGEON
    private String hospital;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
