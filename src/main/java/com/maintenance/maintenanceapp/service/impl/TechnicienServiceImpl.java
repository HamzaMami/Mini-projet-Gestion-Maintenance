package com.maintenance.maintenanceapp.service.impl;

import com.maintenance.maintenanceapp.entity.Technicien;
import com.maintenance.maintenanceapp.repository.TechnicienRepository;
import com.maintenance.maintenanceapp.service.TechnicienService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TechnicienServiceImpl implements TechnicienService {

    private final TechnicienRepository repository;

    public TechnicienServiceImpl(TechnicienRepository repository) {
        this.repository = repository;
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
    public void deleteTechnicien(Long id) {
        repository.deleteById(id);
    }
}