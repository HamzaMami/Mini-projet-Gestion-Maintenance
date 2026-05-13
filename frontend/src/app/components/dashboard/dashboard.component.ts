import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { DashboardSummary } from '../../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <div class="title-group"><h1>System Overview</h1><p>Real-time analytics & maintenance logistics</p></div>
        <div class="actions-group" style="display:flex; gap:1rem; align-items:center">
          <button class="btn-icon glass-card" (click)="ngOnInit()" title="Sync Data">
            <span class="iconify" data-icon="lucide:refresh-cw"></span>
          </button>
          <div class="date-chip glass-card"><span class="iconify" data-icon="lucide:calendar"></span> {{ currentDay }}</div>
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-card glass-card">
          <div class="metric-info"><span class="label">Total Assets</span><h2 class="value blue-text">{{ summary?.totalEquipements || 0 }}</h2></div>
          <div class="metric-icon blue-bg"><span class="iconify" data-icon="lucide:database"></span></div>
        </div>
        <div class="metric-card glass-card">
          <div class="metric-info"><span class="label">Active Failures</span><h2 class="value red-text">{{ summary?.totalPannes || 0 }}</h2></div>
          <div class="metric-icon red-bg"><span class="iconify" data-icon="lucide:alert-triangle"></span></div>
        </div>
        <div class="metric-card glass-card">
          <div class="metric-info"><span class="label">Technicians</span><h2 class="value blue-text">{{ summary?.techniciensDisponibles || 0 }}<span class="sub">/{{ summary?.totalTechniciens || 0 }}</span></h2></div>
          <div class="metric-icon blue-bg"><span class="iconify" data-icon="lucide:users"></span></div>
        </div>
      </div>

      <div class="main-grid">
        <div class="health-section glass-card">
          <div class="section-header"><h3>System Health Index</h3><span class="badge success">Operational</span></div>
          <div class="health-visual">
            <div class="wave-container">
              <div class="wave" *ngFor="let h of waveHeights; let i = index" [style.height.%]="h" [style.animation-delay.s]="i * 0.1"></div>
            </div>
            <div class="health-metrics">
              <div class="h-stat"><span class="h-label">Efficiency</span><span class="h-value blue-text">98.2%</span></div>
              <div class="h-stat"><span class="h-label">Uptime</span><span class="h-value purple-text">99.9h</span></div>
            </div>
          </div>
        </div>

        <div class="activity-section glass-card">
          <div class="section-header"><h3>Log Activity</h3></div>
          <div class="activity-list">
            <div class="activity-item" *ngIf="(summary?.totalPannes || 0) > 0">
              <div class="dot red-bg"></div>
              <div class="item-content"><p>Active failure protocol in progress</p><span>Reported recently</span></div>
            </div>
            <div class="activity-item">
              <div class="dot blue-bg"></div>
              <div class="item-content"><p>System scan complete. {{ summary?.totalEquipements || 0 }} assets verified.</p><span>Just now</span></div>
            </div>
            <div class="activity-item">
              <div class="dot success"></div>
              <div class="item-content"><p>Personnel registry synced. {{ summary?.totalTechniciens || 0 }} techs active.</p><span>1 hour ago</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { display: flex; flex-direction: column; gap: 2.5rem; }
    .dashboard-header { display: flex; justify-content: space-between; align-items: center; }
    .metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
    .metric-card { display: flex; justify-content: space-between; align-items: center; padding: 2rem; .label { font-size: 0.8rem; text-transform: uppercase; color: #718096; } .value { font-size: 2.4rem; font-weight: 800; } .sub { font-size: 1.2rem; color: #cbd5e0; } }
    .metric-icon { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
    .blue-bg { background: #ebf8ff; color: #4299e1; }
    .red-bg { background: #fff5f5; color: #f56565; }
    .main-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 1.5rem; }
    .health-section { padding: 2rem; .section-header { display: flex; justify-content: space-between; margin-bottom: 2rem; } .wave-container { display: flex; align-items: flex-end; gap: 6px; height: 80px; border-bottom: 1px solid #edf2f7; margin-bottom: 1.5rem; } .wave { flex: 1; background: #ebf8ff; border-radius: 4px 4px 0 0; animation: wave-anim 2s infinite alternate; } }
    @keyframes wave-anim { from { background: #ebf8ff; } to { background: #bee3f8; } }
    .health-metrics { display: flex; gap: 2rem; .h-stat { display: flex; flex-direction: column; } .h-label { font-size: 0.75rem; color: #718096; } .h-value { font-size: 1.2rem; font-weight: 700; } }
    .activity-section { padding: 2rem; .activity-list { display: flex; flex-direction: column; gap: 1.2rem; } .activity-item { display: flex; gap: 12px; } .dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 6px; } .item-content p { font-size: 0.9rem; color: #2d3748; } .item-content span { font-size: 0.8rem; color: #a0aec0; } }
    .success { background: #f0fff4; color: #38a169; }
  `]
})
export class DashboardComponent implements OnInit {
  summary: DashboardSummary | null = null;
  currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  waveHeights = Array.from({ length: 12 }, () => Math.floor(Math.random() * 60) + 20);

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.apiService.getDashboard().subscribe({
      next: (data) => { this.summary = data; this.cdr.markForCheck(); },
      error: (err) => console.error('❌ Dashboard error:', err)
    });
  }
}
