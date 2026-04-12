package com.maintenance.maintenanceapp.service;

import com.maintenance.maintenanceapp.entity.Intervention;
import java.util.List;

public interface InterventionService {
    List<Intervention> getAllInterventions();
    Intervention getInterventionById(Long id);
    Intervention createIntervention(Intervention intervention);
    Intervention updateIntervention(Long id, Intervention intervention);
    void deleteIntervention(Long id);
    Intervention assignTechnicien(Long id, Long techId);
}