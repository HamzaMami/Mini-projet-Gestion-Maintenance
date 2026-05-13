import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Intervention, Equipement, Technicien, StatutIntervention } from '../../models/models';
import { BaseList } from '../base-list';

@Component({
  selector: 'app-intervention-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-container">
      <div class="header">
        <div class="title-group"><h1>Maintenance</h1><p>Scheduling</p></div>
        <button class="btn-neon" (click)="openAdd()"><span class="iconify" data-icon="lucide:calendar"></span> Schedule</button>
      </div>

      <div class="modal-overlay" *ngIf="showForm">
        <div class="modal-card">
          <h2>Protocol</h2>
          <form #iForm="ngForm" (ngSubmit)="save()">
            <div class="form-group">
              <label>Asset</label>
              <select [(ngModel)]="currentItem.equipement.id" name="eqId" required #eqSelect="ngModel">
                <option [value]="0" disabled>Select an industrial asset...</option>
                <option *ngFor="let eq of equipements" [value]="eq.id">{{ eq.nom }}</option>
              </select>
            </div>
            <div class="form-group"><label>Date</label><input type="date" [(ngModel)]="currentItem.date" name="date" required></div>
            <div class="form-group"><label>Cost</label><input type="number" [(ngModel)]="currentItem.cout" name="cout"></div>
            <div class="form-group"><label>Status</label>
              <select [(ngModel)]="currentItem.statut" name="st">
                <option value="PLANIFIE">Planned</option>
                <option value="EN_COURS">Active</option>
                <option value="TERMINE">Completed</option>
              </select>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-glass" (click)="cancel()">Cancel</button>
              <button type="submit" class="btn-neon" [disabled]="!iForm.form.valid || currentItem.equipement.id === 0 || loading">Confirm</button>
            </div>
          </form>
        </div>
      </div>

      <div class="modal-overlay" *ngIf="showAssignModal">
        <div class="modal-card">
          <h2>Assign Personnel</h2>
          <div class="form-group">
            <label>Technician</label>
            <select [(ngModel)]="selectedTechId">
              <option [value]="null" disabled>Choose available tech...</option>
              <option *ngFor="let t of availableTechs" [value]="t.id">{{ t.nom }}</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-glass" (click)="showAssignModal = false">Abort</button>
            <button type="button" class="btn-neon" [disabled]="!selectedTechId" (click)="confirmAssignment()">Assign</button>
          </div>
        </div>
      </div>

      <div class="table-card glass-card">
        <div class="empty-state" *ngIf="loadingList"><span class="iconify spinning blue-text" style="font-size:2.5rem" data-icon="lucide:loader-2"></span></div>
        <table *ngIf="!loadingList && items.length > 0">
          <thead><tr><th>ID</th><th>Date</th><th>Status</th><th>Asset</th><th>Personnel</th><th class="text-right">Actions</th></tr></thead>
          <tbody>
            <tr *ngFor="let i of items; trackBy: trackById">
              <td class="id-cell">#{{ i.id }}</td><td>{{ i.date | date:'mediumDate' }}</td>
              <td><span class="badge" [ngClass]="i.statut.toLowerCase()"><span class="dot"></span> {{ i.statut }}</span></td>
              <td class="bold blue-text">{{ i.equipement.nom }}</td>
              <td>
                <div *ngIf="i.technicien" style="display:flex; align-items:center; gap:10px; background:#f8fafc; padding:0.3rem 0.8rem; border-radius:8px; border:1px solid #e2e8f0; width:fit-content; font-size:0.85rem">
                  <div style="width:20px; height:20px; border-radius:4px; background:#4a90e2; color:white; display:flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:800">{{ i.technicien.nom.charAt(0) }}</div>
                  {{ i.technicien.nom }}
                </div>
                <button *ngIf="!i.technicien" style="background:transparent; border:1px dashed #4a90e2; color:#4a90e2; padding:0.4rem 0.8rem; border-radius:8px; cursor:pointer; font-size:0.8rem; font-weight:600" (click)="openAssign(i.id!)">Assign</button>
              </td>
              <td class="text-right"><button class="btn-icon" (click)="delete(i.id!, 'Abort protocol?')"><span class="iconify red-text" data-icon="lucide:trash-2"></span></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class InterventionListComponent extends BaseList<Intervention> {
  equipements: Equipement[] = [];
  techniciens: Technicien[] = [];
  showAssignModal = false;
  selectedIntId: number | null = null;
  selectedTechId: number | null = null;

  constructor(private api: ApiService, cdr: ChangeDetectorRef) { super(cdr); }

  override ngOnInit() { 
    super.ngOnInit(); 
    this.api.getEquipements().subscribe(d => { this.equipements = d; this.cdr.markForCheck(); }); 
    this.api.getTechniciens().subscribe(d => { this.techniciens = d; this.cdr.markForCheck(); }); 
  }

  get availableTechs() { return this.techniciens.filter(t => t.disponibilite); }
  getItems() { return this.api.getInterventions(); }
  saveItem(item: Intervention) { return this.api.createIntervention(item); }
  deleteItem(id: number) { return this.api.deleteIntervention(id); }
  resetItem(): Intervention { return { statut: StatutIntervention.PLANIFIE, date: new Date().toISOString().split('T')[0], cout: 0, equipement: { id: 0, nom: '', etat: '', dateAcquisition: '' } }; }

  openAssign(id: number) { this.selectedIntId = id; this.selectedTechId = null; this.showAssignModal = true; this.cdr.markForCheck(); }
  confirmAssignment() { if (this.selectedIntId && this.selectedTechId) { this.api.assignTechnician(this.selectedIntId, this.selectedTechId).subscribe(() => { this.load(); this.showAssignModal = false; this.cdr.markForCheck(); }); } }
}
