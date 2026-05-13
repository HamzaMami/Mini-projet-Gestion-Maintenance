package com.maintenance.maintenanceapp.service;
import com.maintenance.maintenanceapp.entity.Equipement;

import java.util.List;

public interface EquipementService {
    List<Equipement> getAllEquipements();
    Equipement getEquipementById(Long id);
    Equipement createEquipement(Equipement equipement);
    Equipement updateEquipement(Long id, Equipement equipement);
    void deleteEquipement(Long id);
    void resetAll();
}
