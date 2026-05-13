import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EquipementListComponent } from './components/equipement-list/equipement-list.component';
import { PanneListComponent } from './components/panne-list/panne-list.component';
import { InterventionListComponent } from './components/intervention-list/intervention-list.component';
import { TechnicienListComponent } from './components/technicien-list/technicien-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'equipements', component: EquipementListComponent },
  { path: 'pannes', component: PanneListComponent },
  { path: 'interventions', component: InterventionListComponent },
  { path: 'techniciens', component: TechnicienListComponent }
];
