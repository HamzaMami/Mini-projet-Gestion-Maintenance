package com.maintenance.maintenanceapp.controller;

import com.maintenance.maintenanceapp.dto.DashboardDTO;
import com.maintenance.maintenanceapp.repository.InterventionRepository;
import com.maintenance.maintenanceapp.repository.PanneRepository;
import com.maintenance.maintenanceapp.repository.TechnicienRepository;
import com.maintenance.maintenanceapp.repository.EquipementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final PanneRepository panneRepository;
    private final InterventionRepository interventionRepository;
    private final TechnicienRepository technicienRepository;
    private final EquipementRepository equipementRepository;

    @GetMapping
    public DashboardDTO getDashboard() {
        return DashboardDTO.builder()
                .totalPannes(panneRepository.count())
                .totalInterventions(interventionRepository.count())
                .totalTechniciens(technicienRepository.count())
                .techniciensDisponibles(technicienRepository.countByDisponibiliteTrue())
                .totalEquipements(equipementRepository.count())
                .build();
    }
}