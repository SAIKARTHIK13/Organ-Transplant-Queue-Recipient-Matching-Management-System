package com.karthik.backend.controller;

import com.karthik.backend.model.Recipient;
import com.karthik.backend.service.MatchingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matching")
public class MatchingController {

    @Autowired
    private MatchingService matchingService;

    @GetMapping("/{organId}")
    public ResponseEntity<List<Recipient>> findMatches(@PathVariable Long organId) {
        return ResponseEntity.ok(matchingService.matchOrgan(organId));
    }
}
