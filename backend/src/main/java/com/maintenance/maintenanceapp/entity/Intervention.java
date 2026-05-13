package com.maintenance.maintenanceapp.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Intervention {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private StatutIntervention statut;

    private LocalDate date;
    private Double cout;

    @ManyToOne
    @JoinColumn(name = "equipement_id")
    private Equipement equipement;

    @ManyToOne
    @JoinColumn(name = "technicien_id")
    private Technicien technicien;

    public Intervention() {
    }

    public Intervention(StatutIntervention statut, LocalDate date, Double cout,
                        Equipement equipement, Technicien technicien) {
        this.statut = statut;
        this.date = date;
        this.cout = cout;
        this.equipement = equipement;
        this.technicien = technicien;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public StatutIntervention getStatut() { return statut; }
    public void setStatut(StatutIntervention statut) { this.statut = statut; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public Double getCout() { return cout; }
    public void setCout(Double cout) { this.cout = cout; }

    public Equipement getEquipement() { return equipement; }
    public void setEquipement(Equipement equipement) { this.equipement = equipement; }

    public Technicien getTechnicien() { return technicien; }
    public void setTechnicien(Technicien technicien) { this.technicien = technicien; }
}