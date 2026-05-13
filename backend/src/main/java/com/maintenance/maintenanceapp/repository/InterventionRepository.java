package com.maintenance.maintenanceapp.repository;

import com.maintenance.maintenanceapp.entity.Intervention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface InterventionRepository extends JpaRepository<Intervention, Long> {
    @Modifying
    @Transactional
    @Query("UPDATE Intervention i SET i.technicien = null WHERE i.technicien.id = :techId")
    void unassignTechnicianFromInterventions(Long techId);
}