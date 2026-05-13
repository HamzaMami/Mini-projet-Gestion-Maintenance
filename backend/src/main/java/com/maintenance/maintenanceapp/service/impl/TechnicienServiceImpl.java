package com.maintenance.maintenanceapp.service.impl;

import com.maintenance.maintenanceapp.entity.Technicien;
import com.maintenance.maintenanceapp.repository.TechnicienRepository;
import com.maintenance.maintenanceapp.repository.InterventionRepository;
import com.maintenance.maintenanceapp.service.TechnicienService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class TechnicienServiceImpl implements TechnicienService {

    private final TechnicienRepository repository;
    private final InterventionRepository interventionRepository;

    public TechnicienServiceImpl(TechnicienRepository repository, InterventionRepository interventionRepository) {
        this.repository = repository;
        this.interventionRepository = interventionRepository;
    }

    @Override
    public List<Technicien> getAllTechniciens() {
        return repository.findAll();
    }

    @Override
    public Technicien getTechnicienById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Technicien not found"));
    }

    @Override
    public Technicien createTechnicien(Technicien technicien) {
        return repository.save(technicien);
    }

    @Override
    public Technicien updateTechnicien(Long id, Technicien technicien) {
        Technicien existing = getTechnicienById(id);
        existing.setNom(technicien.getNom());
        existing.setCompetences(technicien.getCompetences());
        existing.setDisponibilite(technicien.getDisponibilite());
        return repository.save(existing);
    }

    @Override
    @Transactional
    public void deleteTechnicien(Long id) {
        interventionRepository.unassignTechnicianFromInterventions(id);
        repository.deleteById(id);
    }
}