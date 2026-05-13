export enum StatutIntervention {
  PLANIFIE = 'PLANIFIE',
  EN_COURS = 'EN_COURS',
  TERMINE = 'TERMINE'
}

export interface Equipement {
  id?: number;
  nom: string;
  etat: string;
  dateAcquisition: string;
}

export interface Panne {
  id?: number;
  description: string;
  categorie: string;
  dateSignalement: string;
  equipement: Equipement;
}

export interface Technicien {
  id?: number;
  nom: string;
  competences: string;
  disponibilite: boolean;
}

export interface Intervention {
  id?: number;
  statut: StatutIntervention;
  date: string;
  cout: number;
  equipement: Equipement;
  technicien?: Technicien;
}

export interface DashboardSummary {
  totalPannes: number;
  totalInterventions: number;
  totalTechniciens: number;
  techniciensDisponibles: number;
  totalEquipements: number;
}
