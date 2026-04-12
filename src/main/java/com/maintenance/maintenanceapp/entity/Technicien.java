package com.maintenance.maintenanceapp.entity;
import jakarta.persistence.*;
@Entity
public class Technicien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String competences;
    private Boolean disponibilite;

    public Technicien() {
    }

    public Technicien(Long id, String nom, String competences, Boolean disponibilite) {
        this.id = id;
        this.nom = nom;
        this.competences = competences;
        this.disponibilite = disponibilite;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }


    public String getCompetences() {
        return competences;
    }

    public void setCompetences(String competences) {
        this.competences = competences;
    }


    public Boolean getDisponibilite() {
        return disponibilite;
    }
    public void setDisponibilite(Boolean disponibilite) {
        this.disponibilite = disponibilite;
    }

}
