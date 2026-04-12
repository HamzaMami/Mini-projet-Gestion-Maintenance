package com.maintenance.maintenanceapp.service.impl;

import com.maintenance.maintenanceapp.entity.Panne;
import com.maintenance.maintenanceapp.repository.PanneRepository;
import com.maintenance.maintenanceapp.service.PanneService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PanneServiceImpl implements PanneService {

    private final PanneRepository repository;

    public PanneServiceImpl(PanneRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Panne> getAllPannes() {
        return repository.findAll();
    }

    @Override
    public Panne getPanneById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Panne not found"));
    }

    @Override
    public Panne createPanne(Panne panne) {
        return repository.save(panne);
    }

    @Override
    public Panne updatePanne(Long id, Panne panne) {
        Panne existing = getPanneById(id);
        existing.setDescription(panne.getDescription());
        existing.setCategorie(panne.getCategorie());
        existing.setDateSignalement(panne.getDateSignalement());
        existing.setEquipement(panne.getEquipement());
        return repository.save(existing);
    }

    @Override
    public void deletePanne(Long id) {
        repository.deleteById(id);
    }
}