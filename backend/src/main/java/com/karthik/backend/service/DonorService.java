package com.karthik.backend.service;

import com.karthik.backend.model.Donor;
import com.karthik.backend.repository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonorService {

    @Autowired
    private DonorRepository donorRepository;

    public Donor addDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }
}
