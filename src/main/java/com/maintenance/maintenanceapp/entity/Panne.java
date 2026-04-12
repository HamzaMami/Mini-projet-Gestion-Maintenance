package com.maintenance.maintenanceapp.entity;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Panne {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private String categorie;
    private LocalDate dateSignalement;

    @ManyToOne
    @JoinColumn(name = "equipement_id")
    private Equipement equipement;

    public Panne() {
    }

    public Panne(Long id, String description, String categorie, LocalDate dateSignalement, Equipement equipement) {
        this.id = id;
        this.description = description;
        this.categorie = categorie;
        this.dateSignalement = dateSignalement;
        this.equipement = equipement;
    }


    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public LocalDate getDateSignalement() {
        return dateSignalement;
    }

    public void setDateSignalement(LocalDate dateSignalement) {
        this.dateSignalement = dateSignalement;
    }

    public Equipement getEquipement() {
        return equipement;
    }

    public void setEquipement(Equipement equipement) {
        this.equipement = equipement;
    }

}
