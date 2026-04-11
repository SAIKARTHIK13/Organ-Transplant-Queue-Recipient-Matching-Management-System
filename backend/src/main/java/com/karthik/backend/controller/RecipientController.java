package com.karthik.backend.controller;

import com.karthik.backend.model.Recipient;
import com.karthik.backend.service.RecipientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recipients")
public class RecipientController {

    @Autowired
    private RecipientService recipientService;

    @PostMapping
    public ResponseEntity<Recipient> addRecipient(@RequestBody Recipient recipient) {
        return ResponseEntity.ok(recipientService.addRecipient(recipient));
    }

    @GetMapping
    public ResponseEntity<List<Recipient>> getAllRecipients() {
        return ResponseEntity.ok(recipientService.getAllRecipients());
    }

    @PutMapping("/{id}/urgency")
    public ResponseEntity<Recipient> updateUrgency(@PathVariable Long id, @RequestBody Map<String, Integer> payload) {
        return ResponseEntity.ok(recipientService.updateUrgency(id, payload.get("urgencyScore")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeRecipient(@PathVariable Long id) {
        recipientService.removeRecipient(id);
        return ResponseEntity.ok("Recipient removed successfully");
    }
}
