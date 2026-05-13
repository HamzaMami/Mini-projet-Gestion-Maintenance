package com.maintenance.maintenanceapp.service.impl;

import com.maintenance.maintenanceapp.entity.Intervention;
import com.maintenance.maintenanceapp.entity.Technicien;
import com.maintenance.maintenanceapp.repository.InterventionRepository;
import com.maintenance.maintenanceapp.repository.TechnicienRepository;
import com.maintenance.maintenanceapp.service.InterventionService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InterventionServiceImpl implements InterventionService {

    private final InterventionRepository repository;
    private final TechnicienRepository technicienRepository;


    public InterventionServiceImpl(InterventionRepository repository, TechnicienRepository technicienRepository) {
        this.repository = repository;
        this.technicienRepository = technicienRepository;
    }

    @Override
    public List<Intervention> getAllInterventions() {
        return repository.findAll();
    }

    @Override
    public Intervention getInterventionById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Intervention not found"));
    }

    @Override
    public Intervention createIntervention(Intervention intervention) {
        return repository.save(intervention);
    }

    @Override
    public Intervention updateIntervention(Long id, Intervention intervention) {
        Intervention existing = getInterventionById(id);
        existing.setStatut(intervention.getStatut());
        existing.setDate(intervention.getDate());
        existing.setCout(intervention.getCout());
        existing.setEquipement(intervention.getEquipement());
        existing.setTechnicien(intervention.getTechnicien());
        return repository.save(existing);
    }

    @Override
    public void deleteIntervention(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Intervention assignTechnicien(Long id, Long techId) {
        Intervention intervention = getInterventionById(id);
        Technicien technicien = technicienRepository.findById(techId)
                .orElseThrow(() -> new RuntimeException("Technicien not found"));
        intervention.setTechnicien(technicien);
        return repository.save(intervention);
    }
}