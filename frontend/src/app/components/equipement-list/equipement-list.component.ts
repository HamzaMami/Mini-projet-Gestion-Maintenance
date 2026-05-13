import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Equipement } from '../../models/models';
import { BaseList } from '../base-list';

@Component({
  selector: 'app-equipement-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-container">
      <div class="header">
        <div class="title-group">
          <h1>Equipment Assets</h1>
          <p>Inventory management & status tracking</p>
        </div>
        <button class="btn-neon" (click)="openAdd()">
          <span class="iconify" data-icon="lucide:plus"></span> Add Equipment
        </button>
      </div>

      <div class="modal-overlay" *ngIf="showForm">
        <div class="modal-card">
          <h2>{{ editingId ? 'Edit' : 'Register' }} Equipment</h2>
          <form #eqForm="ngForm" (ngSubmit)="save()">
            <div class="form-group"><label>Asset Name</label><input type="text" [(ngModel)]="currentItem.nom" name="eqNom" required></div>
            <div class="form-group"><label>Status</label>
              <select [(ngModel)]="currentItem.etat" name="eqEtat">
                <option value="FONCTIONNEL">Functional</option>
                <option value="EN_PANNE">Down</option>
                <option value="EN_MAINTENANCE">Maintenance</option>
              </select>
            </div>
            <div class="form-group"><label>Acquisition Date</label><input type="date" [(ngModel)]="currentItem.dateAcquisition" name="eqDate"></div>
            <div class="form-actions">
              <button type="button" class="btn-glass" (click)="cancel()">Cancel</button>
              <button type="submit" class="btn-neon" [disabled]="!eqForm.form.valid || loading">
                <span *ngIf="loading" class="iconify spinning" data-icon="lucide:loader-2"></span> Save Asset
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="table-card glass-card">
        <div class="empty-state" *ngIf="loadingList"><span class="iconify spinning blue-text" style="font-size:2.5rem" data-icon="lucide:loader-2"></span><p>Scanning...</p></div>
        <div class="empty-state" *ngIf="!loadingList && items.length === 0"><span class="iconify large opacity-30" data-icon="lucide:search-x"></span><p>No equipment registered.</p></div>

        <table *ngIf="!loadingList && items.length > 0">
          <thead><tr><th>ID</th><th>Name</th><th>Status</th><th>Acquired</th><th class="text-right">Actions</th></tr></thead>
          <tbody>
            <tr *ngFor="let eq of items; trackBy: trackById">
              <td class="id-cell">#{{ eq.id }}</td><td class="bold">{{ eq.nom }}</td>
              <td><span class="badge" [ngClass]="getBadge(eq.etat)"><span class="dot"></span> {{ getStatus(eq.etat) }}</span></td>
              <td>{{ eq.dateAcquisition | date:'mediumDate' }}</td>
              <td class="text-right">
                <button class="btn-icon" (click)="edit(eq)"><span class="iconify blue-text" data-icon="lucide:edit-3"></span></button>
                <button class="btn-icon" (click)="delete(eq.id!, 'Remove this asset?')"><span class="iconify red-text" data-icon="lucide:trash-2"></span></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class EquipementListComponent extends BaseList<Equipement> {
  constructor(private api: ApiService, cdr: ChangeDetectorRef) { super(cdr); }
  getItems() { return this.api.getEquipements(); }
  saveItem(item: Equipement, id: any) { return id ? this.api.updateEquipement(id, item) : this.api.createEquipement(item); }
  deleteItem(id: number) { return this.api.deleteEquipement(id); }
  resetItem(): Equipement { return { nom: '', etat: 'FONCTIONNEL', dateAcquisition: new Date().toISOString().split('T')[0] }; }
  getBadge(e: string) { return e?.toUpperCase() === 'FONCTIONNEL' ? 'success' : e?.toUpperCase() === 'EN_PANNE' ? 'danger' : 'warning'; }
  getStatus(s: string) { return s?.toUpperCase() === 'FONCTIONNEL' ? 'Operational' : s?.toUpperCase() === 'EN_PANNE' ? 'Offline' : 'Maintenance'; }
}
