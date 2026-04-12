package com.maintenance.maintenanceapp.repository;

import com.maintenance.maintenanceapp.entity.Technicien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TechnicienRepository extends JpaRepository<Technicien, Long> {
    Long countByDisponibiliteTrue();
}