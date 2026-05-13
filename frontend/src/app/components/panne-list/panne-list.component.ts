import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Panne, Equipement } from '../../models/models';
import { BaseList } from '../base-list';

@Component({
  selector: 'app-panne-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-container">
      <div class="header">
        <div class="title-group"><h1>Active Failures</h1><p>incident reporting</p></div>
        <button class="btn-neon" (click)="openAdd()"><span class="iconify" data-icon="lucide:alert-circle"></span> Report Failure</button>
      </div>

      <div class="modal-overlay" *ngIf="showForm">
        <div class="modal-card">
          <h2>Report New Incident</h2>
          <form #pForm="ngForm" (ngSubmit)="save()">
            <div class="form-group"><label>Description</label><textarea [(ngModel)]="currentItem.description" name="desc" required></textarea></div>
            <div class="form-group"><label>Category</label><input type="text" [(ngModel)]="currentItem.categorie" name="cat"></div>
            <div class="form-group"><label>Asset</label>
              <select [(ngModel)]="currentItem.equipement.id" name="eqId" required>
                <option *ngFor="let eq of equipements" [value]="eq.id">{{ eq.nom }}</option>
              </select>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-glass" (click)="cancel()">Cancel</button>
              <button type="submit" class="btn-neon" [disabled]="!pForm.form.valid || loading">Transmit Report</button>
            </div>
          </form>
        </div>
      </div>

      <div class="table-card glass-card">
        <div class="empty-state" *ngIf="loadingList"><span class="iconify spinning blue-text" style="font-size:2.5rem" data-icon="lucide:loader-2"></span></div>
        <div class="empty-state" *ngIf="!loadingList && items.length === 0"><p>All systems nominal.</p></div>
        <table *ngIf="!loadingList && items.length > 0">
          <thead><tr><th>ID</th><th>Description</th><th>Category</th><th>Asset</th><th class="text-right">Actions</th></tr></thead>
          <tbody>
            <tr *ngFor="let p of items; trackBy: trackById">
              <td class="id-cell">#{{ p.id }}</td><td style="max-width:300px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap">{{ p.description }}</td>
              <td><span style="background:#f1f5f9; padding:0.3rem 0.7rem; border-radius:6px; font-size:0.8rem">{{ p.categorie }}</span></td>
              <td class="bold blue-text">{{ p.equipement.nom }}</td>
              <td class="text-right"><button class="btn-icon" (click)="delete(p.id!, 'Resolve this incident?')"><span class="iconify red-text" data-icon="lucide:trash-2"></span></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class PanneListComponent extends BaseList<Panne> {
  equipements: Equipement[] = [];
  constructor(private api: ApiService, cdr: ChangeDetectorRef) { super(cdr); }
  override ngOnInit() { super.ngOnInit(); this.api.getEquipements().subscribe(d => { this.equipements = d; this.cdr.markForCheck(); }); }
  getItems() { return this.api.getPannes(); }
  saveItem(item: Panne) { return this.api.createPanne(item); }
  deleteItem(id: number) { return this.api.deletePanne(id); }
  resetItem(): Panne { return { description: '', categorie: '', dateSignalement: new Date().toISOString().split('T')[0], equipement: { id: 0, nom: '', etat: '', dateAcquisition: '' } }; }
}
