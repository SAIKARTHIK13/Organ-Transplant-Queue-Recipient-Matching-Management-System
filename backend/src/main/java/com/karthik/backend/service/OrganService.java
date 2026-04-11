package com.karthik.backend.service;

import com.karthik.backend.model.Organ;
import com.karthik.backend.repository.OrganRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganService {

    @Autowired
    private OrganRepository organRepository;

    public Organ addOrgan(Organ organ) {
        return organRepository.save(organ);
    }

    public List<Organ> getAvailableOrgans() {
        return organRepository.findByStatus("AVAILABLE");
    }
}
