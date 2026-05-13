package com.maintenance.maintenanceapp.repository;


import com.maintenance.maintenanceapp.entity.Panne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PanneRepository extends JpaRepository<Panne, Long> {
}