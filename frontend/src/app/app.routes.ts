import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EquipementListComponent } from './components/equipement-list/equipement-list.component';
import { PanneListComponent } from './components/panne-list/panne-list.component';
import { InterventionListComponent } from './components/intervention-list/intervention-list.component';
import { TechnicienListComponent } from './components/technicien-list/technicien-list.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'equipements', component: EquipementListComponent, canActivate: [AuthGuard] },
  { path: 'pannes', component: PanneListComponent, canActivate: [AuthGuard] },
  { path: 'interventions', component: InterventionListComponent, canActivate: [AuthGuard] },
  { path: 'techniciens', component: TechnicienListComponent, canActivate: [AuthGuard] }
];
