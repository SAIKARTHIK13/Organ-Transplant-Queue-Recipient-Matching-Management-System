package com.karthik.backend.repository;

import com.karthik.backend.model.Donor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonorRepository extends JpaRepository<Donor, Long> {
}
