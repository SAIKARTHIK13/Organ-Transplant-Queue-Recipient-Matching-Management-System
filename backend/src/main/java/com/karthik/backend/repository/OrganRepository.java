package com.karthik.backend.repository;

import com.karthik.backend.model.Organ;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrganRepository extends JpaRepository<Organ, Long> {
    List<Organ> findByStatus(String status);
}
