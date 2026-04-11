package com.karthik.backend.service;

import com.karthik.backend.model.Organ;
import com.karthik.backend.model.Recipient;
import com.karthik.backend.repository.OrganRepository;
import com.karthik.backend.repository.RecipientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchingService {

    @Autowired
    private OrganRepository organRepository;

    @Autowired
    private RecipientRepository recipientRepository;

    public List<Recipient> matchOrgan(Long organId) {
        Organ organ = organRepository.findById(organId)
                .orElseThrow(() -> new RuntimeException("Organ not found"));

        if (!"AVAILABLE".equals(organ.getStatus())) {
            throw new RuntimeException("Organ is not available for matching");
        }

        List<Recipient> allRecipients = recipientRepository.findAll();

        return allRecipients.stream()
                .filter(r -> "WAITING".equals(r.getStatus()))
                .filter(r -> r.getOrganNeeded() != null && r.getOrganNeeded().equalsIgnoreCase(organ.getOrganType()))
                .filter(r -> r.getBloodGroup() != null && r.getBloodGroup().equalsIgnoreCase(organ.getBloodGroup()))
                .sorted((r1, r2) -> {
                    // Sort by urgency score descending
                    int urgencyCompare = Integer.compare(r2.getUrgencyScore(), r1.getUrgencyScore());
                    if (urgencyCompare != 0) return urgencyCompare;
                    // If urgency is same, sort by waiting time
                    return r1.getWaitingSince().compareTo(r2.getWaitingSince());
                })
                .collect(Collectors.toList());
    }
}
