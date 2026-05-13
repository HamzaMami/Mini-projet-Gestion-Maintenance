package com.maintenance.maintenanceapp.repository;

import com.maintenance.maintenanceapp.entity.Equipement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface EquipementRepository extends JpaRepository<Equipement, Long> {
    @Transactional
    @Modifying
    @Query(value = "ALTER TABLE equipement AUTO_INCREMENT = 1", nativeQuery = true)
    void resetAutoIncrement();
}