package com.karthik.backend.controller;

import com.karthik.backend.model.TransplantRecord;
import com.karthik.backend.service.TransplantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/transplant")
public class TransplantController {

    @Autowired
    private TransplantService transplantService;

    @PostMapping("/accept")
    public ResponseEntity<TransplantRecord> acceptOrgan(@RequestBody Map<String, Object> payload) {
        Long organId = Long.valueOf(payload.get("organId").toString());
        Long recipientId = Long.valueOf(payload.get("recipientId").toString());
        String performedBy = payload.getOrDefault("performedBy", "System").toString();
        
        return ResponseEntity.ok(transplantService.acceptOrgan(organId, recipientId, performedBy));
    }
}
