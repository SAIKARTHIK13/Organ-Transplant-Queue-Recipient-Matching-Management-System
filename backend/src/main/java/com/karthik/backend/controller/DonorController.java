package com.karthik.backend.controller;

import com.karthik.backend.model.Donor;
import com.karthik.backend.service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
public class DonorController {

    @Autowired
    private DonorService donorService;

    @PostMapping
    public ResponseEntity<Donor> addDonor(@RequestBody Donor donor) {
        return ResponseEntity.ok(donorService.addDonor(donor));
    }

    @GetMapping
    public ResponseEntity<List<Donor>> getAllDonors() {
        return ResponseEntity.ok(donorService.getAllDonors());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Donor> updateDonor(@PathVariable Long id, @RequestBody Donor donor) {
        return ResponseEntity.ok(donorService.updateDonor(id, donor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonor(@PathVariable Long id) {
        donorService.deleteDonor(id);
        return ResponseEntity.ok().build();
    }
}
