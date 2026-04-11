package com.karthik.backend.repository;

import com.karthik.backend.model.Recipient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipientRepository extends JpaRepository<Recipient, Long> {
}
