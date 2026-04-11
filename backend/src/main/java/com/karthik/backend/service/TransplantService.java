package com.karthik.backend.service;

import com.karthik.backend.model.Organ;
import com.karthik.backend.model.Recipient;
import com.karthik.backend.model.TransplantRecord;
import com.karthik.backend.repository.OrganRepository;
import com.karthik.backend.repository.RecipientRepository;
import com.karthik.backend.repository.TransplantRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TransplantService {

    @Autowired
    private OrganRepository organRepository;

    @Autowired
    private RecipientRepository recipientRepository;

    @Autowired
    private TransplantRecordRepository transplantRecordRepository;

    @Transactional
    public TransplantRecord acceptOrgan(Long organId, Long recipientId, String performedBy) {
        Organ organ = organRepository.findById(organId)
                .orElseThrow(() -> new RuntimeException("Organ not found"));
        Recipient recipient = recipientRepository.findById(recipientId)
                .orElseThrow(() -> new RuntimeException("Recipient not found"));

        if (!"AVAILABLE".equals(organ.getStatus())) {
            throw new RuntimeException("Organ no longer available");
        }

        organ.setStatus("TRANSPLANTED");
        recipient.setStatus("TRANSPLANTED");

        organRepository.save(organ);
        recipientRepository.save(recipient);

        TransplantRecord record = new TransplantRecord();
        record.setOrganId(organId);
        record.setRecipientId(recipientId);
        record.setDonorId(organ.getDonorId());
        record.setPerformedBy(performedBy);
        record.setOutcome("SUCCESS");
        return transplantRecordRepository.save(record);
    }
}
