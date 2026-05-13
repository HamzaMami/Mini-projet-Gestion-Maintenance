package com.maintenance.maintenanceapp.service;
import java.util.List;
import com.maintenance.maintenanceapp.entity.Panne;

public interface PanneService {
    List<Panne> getAllPannes();
    Panne getPanneById(Long id);
    Panne createPanne(Panne panne);
    Panne updatePanne(Long id, Panne panne);
    void deletePanne(Long id);
}
