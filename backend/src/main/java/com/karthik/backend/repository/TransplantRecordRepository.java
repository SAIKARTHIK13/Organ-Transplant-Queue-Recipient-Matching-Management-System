package com.karthik.backend.repository;

import com.karthik.backend.model.TransplantRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransplantRecordRepository extends JpaRepository<TransplantRecord, Long> {
}
