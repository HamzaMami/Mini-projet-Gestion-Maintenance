package com.maintenance.maintenanceapp.controller;
import com.maintenance.maintenanceapp.repository.InterventionRepository;
import com.maintenance.maintenanceapp.repository.PanneRepository;
import com.maintenance.maintenanceapp.repository.TechnicienRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final PanneRepository panneRepository;
    private final InterventionRepository interventionRepository;
    private final TechnicienRepository technicienRepository;

    public DashboardController(PanneRepository panneRepository,
                               InterventionRepository interventionRepository,
                               TechnicienRepository technicienRepository) {
        this.panneRepository = panneRepository;
        this.interventionRepository = interventionRepository;
        this.technicienRepository = technicienRepository;
    }

    @GetMapping
    public Map<String, Long> getDashboard() {
        Map<String, Long> dashboard = new HashMap<>();
        dashboard.put("totalPannes", panneRepository.count());
        dashboard.put("totalInterventions", interventionRepository.count());
        dashboard.put("totalTechniciens", technicienRepository.count());
        dashboard.put("techniciensDisponibles", technicienRepository.countByDisponibiliteTrue());
        return dashboard;
    }
}