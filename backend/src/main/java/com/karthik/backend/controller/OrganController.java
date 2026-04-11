package com.karthik.backend.controller;

import com.karthik.backend.model.Organ;
import com.karthik.backend.service.OrganService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/organs")
public class OrganController {

    @Autowired
    private OrganService organService;

    @PostMapping
    public ResponseEntity<Organ> addOrgan(@RequestBody Organ organ) {
        return ResponseEntity.ok(organService.addOrgan(organ));
    }

    @GetMapping
    public ResponseEntity<List<Organ>> getAvailableOrgans() {
        return ResponseEntity.ok(organService.getAvailableOrgans());
    }
}
