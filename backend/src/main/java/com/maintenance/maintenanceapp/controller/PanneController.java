package com.maintenance.maintenanceapp.controller;

import com.maintenance.maintenanceapp.entity.Panne;
import com.maintenance.maintenanceapp.service.PanneService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pannes")
public class PanneController {

    private final PanneService service;

    public PanneController(PanneService service) {
        this.service = service;
    }

    @GetMapping
    public List<Panne> getAll() {
        return service.getAllPannes();
    }

    @GetMapping("/{id}")
    public Panne getById(@PathVariable Long id) {
        return service.getPanneById(id);
    }

    @PostMapping
    public Panne create(@RequestBody Panne panne) {
        return service.createPanne(panne);
    }

    @PutMapping("/{id}")
    public Panne update(@PathVariable Long id, @RequestBody Panne panne) {
        return service.updatePanne(id, panne);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deletePanne(id);
    }
}