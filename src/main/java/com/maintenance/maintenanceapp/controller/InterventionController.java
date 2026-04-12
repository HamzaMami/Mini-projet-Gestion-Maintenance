package com.maintenance.maintenanceapp.controller;
import com.maintenance.maintenanceapp.entity.Intervention;
import com.maintenance.maintenanceapp.service.InterventionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/interventions")
public class InterventionController {
    private final InterventionService service;

    public InterventionController(InterventionService service) {
        this.service = service;
    }
    @GetMapping
    public List<Intervention> getAll() {
        return service.getAllInterventions();
    }

    @GetMapping("/{id}")
    public Intervention getById(@PathVariable Long id) {
        return service.getInterventionById(id);
    }

    @PostMapping
    public Intervention create(@RequestBody Intervention intervention) {
        return service.createIntervention(intervention);
    }

    @PutMapping("/{id}")
    public Intervention update(@PathVariable Long id, @RequestBody Intervention intervention) {
        return service.updateIntervention(id, intervention);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteIntervention(id);
    }

    @PutMapping("/{id}/assign/{techId}")
    public Intervention assign(@PathVariable Long id, @PathVariable Long techId) {
        return service.assignTechnicien(id, techId);
    }


}
