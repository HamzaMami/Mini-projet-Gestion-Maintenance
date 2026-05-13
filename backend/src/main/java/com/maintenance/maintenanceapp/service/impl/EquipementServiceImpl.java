package com.maintenance.maintenanceapp.service.impl;

import com.maintenance.maintenanceapp.entity.Equipement;
import com.maintenance.maintenanceapp.repository.EquipementRepository;
import com.maintenance.maintenanceapp.service.EquipementService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EquipementServiceImpl implements EquipementService {

    private final EquipementRepository repository;

    public EquipementServiceImpl(EquipementRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Equipement> getAllEquipements() {
        return repository.findAll();
    }

    @Override
    public Equipement getEquipementById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipement not found"));
    }

    @Override
    public Equipement createEquipement(Equipement equipement) {
        if (equipement.getNom() == null || equipement.getNom().trim().isEmpty()) {
            throw new com.maintenance.maintenanceapp.exception.BadRequestException("Le nom de l'équipement ne peut pas être vide");
        }
        return repository.save(equipement);
    }

    @Override
    public Equipement updateEquipement(Long id, Equipement equipement) {
        Equipement existing = getEquipementById(id);
        existing.setNom(equipement.getNom());
        existing.setEtat(equipement.getEtat());
        existing.setDateAcquisition(equipement.getDateAcquisition());
        return repository.save(existing);
    }

    @Override
    public void deleteEquipement(Long id) {
        repository.deleteById(id);
        // Reset ID counter if table is empty to keep IDs clean (for mini-projet)
        if (repository.count() == 0) {
            repository.resetAutoIncrement();
        }
    }

    @Override
    public void resetAll() {
        repository.deleteAll();
        repository.resetAutoIncrement();
    }
}