import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Technicien } from '../../models/models';
import { BaseList } from '../base-list';

@Component({
  selector: 'app-technicien-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-container">
      <div class="header">
        <div class="title-group"><h1>Technicians</h1><p>Resource allocation</p></div>
        <button class="btn-neon" (click)="openAdd()"><span class="iconify" data-icon="lucide:user-plus"></span> Register Personnel</button>
      </div>

      <div class="modal-overlay" *ngIf="showForm">
        <div class="modal-card">
          <h2>Registration</h2>
          <form #tForm="ngForm" (ngSubmit)="save()">
            <div class="form-group"><label>Name</label><input type="text" [(ngModel)]="currentItem.nom" name="nom" required></div>
            <div class="form-group"><label>Expertise</label><input type="text" [(ngModel)]="currentItem.competences" name="comp"></div>
            <div class="form-group" style="flex-direction:row; align-items:center; gap:15px; margin-top:1rem">
              <div class="toggle" [class.active]="currentItem.disponibilite" (click)="currentItem.disponibilite = !currentItem.disponibilite"></div>
              <label>Available</label>
            </div>
            <div class="form-actions"><button type="button" class="btn-glass" (click)="cancel()">Cancel</button><button type="submit" class="btn-neon" [disabled]="!tForm.form.valid || loading">Confirm</button></div>
          </form>
        </div>
      </div>

      <div class="table-card glass-card">
        <div class="empty-state" *ngIf="loadingList"><span class="iconify spinning blue-text" style="font-size:2.5rem" data-icon="lucide:loader-2"></span></div>
        <table *ngIf="!loadingList && items.length > 0">
          <thead><tr><th>ID</th><th>Name</th><th>Expertise</th><th>Status</th><th class="text-right">Actions</th></tr></thead>
          <tbody>
            <tr *ngFor="let t of items; trackBy: trackById">
              <td class="id-cell">#{{ t.id }}</td>
              <td><div style="display:flex; align-items:center; gap:12px"><div style="width:32px; height:32px; border-radius:8px; background:#ebf8ff; color:#4299e1; display:flex; align-items:center; justify-content:center; font-weight:700">{{ t.nom.charAt(0) }}</div><span class="bold">{{ t.nom }}</span></div></td>
              <td style="font-size:0.85rem; color:#718096">{{ t.competences }}</td>
              <td><span class="status-pill" [class.available]="t.disponibilite"><span class="dot" style="width:8px; height:8px; border-radius:50%; display:inline-block; margin-right:8px; background:#cbd5e0" [style.background]="t.disponibilite ? '#38a169': '#cbd5e0'"></span>{{ t.disponibilite ? 'Available' : 'Assigned' }}</span></td>
              <td class="text-right"><button class="btn-icon" (click)="delete(t.id!, 'Decommission?')"><span class="iconify red-text" data-icon="lucide:user-x"></span></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`.status-pill { font-size: 0.8rem; font-weight: 600; color: #a0aec0; &.available { color: #38a169; } }`]
})
export class TechnicienListComponent extends BaseList<Technicien> {
  constructor(private api: ApiService, cdr: ChangeDetectorRef) { super(cdr); }
  getItems() { return this.api.getTechniciens(); }
  saveItem(item: Technicien) { return this.api.createTechnicien(item); }
  deleteItem(id: number) { return this.api.deleteTechnicien(id); }
  resetItem(): Technicien { return { nom: '', competences: '', disponibilite: true }; }
}
