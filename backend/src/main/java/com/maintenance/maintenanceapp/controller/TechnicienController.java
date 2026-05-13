package com.maintenance.maintenanceapp.controller;

import com.maintenance.maintenanceapp.entity.Technicien;
import com.maintenance.maintenanceapp.service.TechnicienService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/techniciens")
public class TechnicienController {

    private final TechnicienService service;

    public TechnicienController(TechnicienService service) {
        this.service = service;
    }

    @GetMapping
    public List<Technicien> getAll() {
        return service.getAllTechniciens();
    }

    @GetMapping("/{id}")
    public Technicien getById(@PathVariable Long id) {
        return service.getTechnicienById(id);
    }

    @PostMapping
    public Technicien create(@RequestBody Technicien technicien) {
        return service.createTechnicien(technicien);
    }

    @PutMapping("/{id}")
    public Technicien update(@PathVariable Long id, @RequestBody Technicien technicien) {
        return service.updateTechnicien(id, technicien);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteTechnicien(id);
    }
}