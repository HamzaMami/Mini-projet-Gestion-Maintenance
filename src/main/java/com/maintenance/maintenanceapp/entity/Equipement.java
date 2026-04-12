package com.maintenance.maintenanceapp.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate ;

@Entity
public class Equipement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String etat;
    private LocalDate dateAcquisition;

    public Equipement() {

    }

    public Equipement(Long id, String nom, String etat, LocalDate dateAquisition) {
        this.id = id;
        this.nom = nom;
        this.etat = etat;
        this.dateAcquisition = dateAquisition;
    }

    public Long getId() {
        return id;
    }

    public void getId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
    public String getEtat() {
        return etat;
    }
    public void setEtat(String etat) {
        this.etat = etat;
    }

    public LocalDate getDateAcquisition() {
        return dateAcquisition;
    }

    public void setDateAcquisition(LocalDate dateAcquisition) {
        this.dateAcquisition = dateAcquisition;
    }


}
