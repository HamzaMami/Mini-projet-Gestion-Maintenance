import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Equipement, Panne, Technicien, Intervention, DashboardSummary } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8080/api';

  constructor(private http: HttpClient) {}

  private handleError(operation: string) {
    return (error: any) => {
      console.error(`${operation} failed:`, error);
      return throwError(() => error);
    };
  }

  // Dashboard
  getDashboard(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.apiUrl}/dashboard`)
      .pipe(catchError(this.handleError('getDashboard')));
  }

  // Equipements
  getEquipements(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(`${this.apiUrl}/equipements`)
      .pipe(catchError(this.handleError('getEquipements')));
  }
  createEquipement(equipement: Equipement): Observable<Equipement> {
    return this.http.post<Equipement>(`${this.apiUrl}/equipements`, equipement)
      .pipe(catchError(this.handleError('createEquipement')));
  }
  updateEquipement(id: number, equipement: Equipement): Observable<Equipement> {
    return this.http.put<Equipement>(`${this.apiUrl}/equipements/${id}`, equipement)
      .pipe(catchError(this.handleError('updateEquipement')));
  }
  deleteEquipement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/equipements/${id}`)
      .pipe(catchError(this.handleError('deleteEquipement')));
  }
  resetEquipements(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/equipements/reset`)
      .pipe(catchError(this.handleError('resetEquipements')));
  }

  // Pannes
  getPannes(): Observable<Panne[]> {
    return this.http.get<Panne[]>(`${this.apiUrl}/pannes`)
      .pipe(catchError(this.handleError('getPannes')));
  }
  createPanne(panne: Panne): Observable<Panne> {
    return this.http.post<Panne>(`${this.apiUrl}/pannes`, panne)
      .pipe(catchError(this.handleError('createPanne')));
  }
  deletePanne(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/pannes/${id}`)
      .pipe(catchError(this.handleError('deletePanne')));
  }

  // Techniciens
  getTechniciens(): Observable<Technicien[]> {
    return this.http.get<Technicien[]>(`${this.apiUrl}/techniciens`)
      .pipe(catchError(this.handleError('getTechniciens')));
  }
  createTechnicien(tech: Technicien): Observable<Technicien> {
    return this.http.post<Technicien>(`${this.apiUrl}/techniciens`, tech)
      .pipe(catchError(this.handleError('createTechnicien')));
  }
  deleteTechnicien(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/techniciens/${id}`)
      .pipe(catchError(this.handleError('deleteTechnicien')));
  }

  // Interventions
  getInterventions(): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(`${this.apiUrl}/interventions`)
      .pipe(catchError(this.handleError('getInterventions')));
  }
  createIntervention(intervention: Intervention): Observable<Intervention> {
    return this.http.post<Intervention>(`${this.apiUrl}/interventions`, intervention)
      .pipe(catchError(this.handleError('createIntervention')));
  }
  updateIntervention(id: number, intervention: Intervention): Observable<Intervention> {
    return this.http.put<Intervention>(`${this.apiUrl}/interventions/${id}`, intervention)
      .pipe(catchError(this.handleError('updateIntervention')));
  }
  deleteIntervention(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/interventions/${id}`)
      .pipe(catchError(this.handleError('deleteIntervention')));
  }
  assignTechnician(interventionId: number, techId: number): Observable<Intervention> {
    return this.http.put<Intervention>(`${this.apiUrl}/interventions/${interventionId}/assign/${techId}`, {})
      .pipe(catchError(this.handleError('assignTechnician')));
  }
}
