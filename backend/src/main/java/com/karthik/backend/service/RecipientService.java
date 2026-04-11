package com.karthik.backend.service;

import com.karthik.backend.model.Recipient;
import com.karthik.backend.repository.RecipientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipientService {

    @Autowired
    private RecipientRepository recipientRepository;

    public Recipient addRecipient(Recipient recipient) {
        return recipientRepository.save(recipient);
    }

    public List<Recipient> getAllRecipients() {
        return recipientRepository.findAll();
    }

    public Recipient updateUrgency(Long id, Integer newUrgency) {
        Recipient recipient = recipientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipient not found"));
        recipient.setUrgencyScore(newUrgency);
        return recipientRepository.save(recipient);
    }

    public void removeRecipient(Long id) {
        recipientRepository.deleteById(id);
    }
}
