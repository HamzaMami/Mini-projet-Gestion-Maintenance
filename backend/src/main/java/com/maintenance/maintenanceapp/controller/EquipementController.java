package com.maintenance.maintenanceapp.controller;

import com.maintenance.maintenanceapp.entity.Equipement;
import com.maintenance.maintenanceapp.service.EquipementService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/equipements")
public class EquipementController {

    private final EquipementService service;

    public EquipementController(EquipementService service) {
        this.service = service;
    }

    @GetMapping
    public List<Equipement> getAll() {
        return service.getAllEquipements();
    }

    @GetMapping("/{id}")
    public Equipement getById(@PathVariable Long id) {
        return service.getEquipementById(id);
    }

    @PostMapping
    public Equipement create(@RequestBody Equipement equipement) {
        return service.createEquipement(equipement);
    }

    @PutMapping("/{id}")
    public Equipement update(@PathVariable Long id, @RequestBody Equipement equipement) {
        return service.updateEquipement(id, equipement);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteEquipement(id);
    }

    @DeleteMapping("/reset")
    public void resetAll() {
        service.resetAll();
    }
}