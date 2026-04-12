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
        if ("LIVING".equalsIgnoreCase(donor.getDonorType()) && donor.getAge() != null && donor.getAge() < 18) {
            throw new RuntimeException("Living donor must be at least 18 years old.");
        }
        return donorRepository.save(donor);
    }

    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }

    public Donor updateDonor(Long id, Donor updatedDonor) {
        Donor donor = donorRepository.findById(id).orElseThrow(() -> new RuntimeException("Donor not found"));
        if (updatedDonor.getName() != null) donor.setName(updatedDonor.getName());
        if (updatedDonor.getDonorType() != null) donor.setDonorType(updatedDonor.getDonorType());
        if (updatedDonor.getBloodGroup() != null) donor.setBloodGroup(updatedDonor.getBloodGroup());
        if (updatedDonor.getTissueType() != null) donor.setTissueType(updatedDonor.getTissueType());
        if (updatedDonor.getAge() != null) donor.setAge(updatedDonor.getAge());
        if (updatedDonor.getCauseOfDeath() != null) donor.setCauseOfDeath(updatedDonor.getCauseOfDeath());
        if (updatedDonor.getHospital() != null) donor.setHospital(updatedDonor.getHospital());
        return donorRepository.save(donor);
    }

    public void deleteDonor(Long id) {
        donorRepository.deleteById(id);
    }
}
