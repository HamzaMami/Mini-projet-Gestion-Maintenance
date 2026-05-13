package com.maintenance.maintenanceapp.service;
import java.util.List;
import com.maintenance.maintenanceapp.entity.Technicien;
public interface TechnicienService {
    List<Technicien> getAllTechniciens();
    Technicien getTechnicienById(Long id);
    Technicien createTechnicien(Technicien technicien);
    Technicien updateTechnicien(Long id, Technicien technicien);
    void deleteTechnicien(Long id);
}
