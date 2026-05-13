import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <div class="login-card glass-card">
        <div class="login-header">
          <div class="logo">
            <span class="iconify" data-icon="lucide:shield-check"></span>
            Maintenix
          </div>
          <h1>System Authentication</h1>
          <p>Industrial Management Portal</p>
        </div>

        <form (ngSubmit)="login()">
          <div class="form-group">
            <label>Administrator ID</label>
            <div class="input-wrapper">
              <span class="iconify input-icon" data-icon="lucide:user"></span>
              <input type="text" [(ngModel)]="username" name="username" placeholder="e.g. admin_maintenix" required>
            </div>
          </div>

          <div class="form-group">
            <label>Access Key</label>
            <div class="input-wrapper">
              <span class="iconify input-icon" data-icon="lucide:lock"></span>
              <input type="password" [(ngModel)]="password" name="password" placeholder="••••••••" required>
            </div>
          </div>

          <div class="login-options">
            <label class="remember-me">
              <input type="checkbox" [(ngModel)]="remember" name="remember">
              <span>Maintain session</span>
            </label>
            <a href="javascript:void(0)" class="forgot-link">Request Key Reset</a>
          </div>

          <button type="submit" class="btn-neon login-btn" [disabled]="loading">
            <span *ngIf="loading" class="iconify spinning" data-icon="lucide:loader-2"></span>
            {{ loading ? 'Authorizing...' : 'Authorize Access' }}
          </button>
        </form>

        <div class="login-footer">
          <p>Secure Enterprise Environment</p>
          <span>v2.4.0 — Maintenix Systems</span>
        </div>
      </div>
      
      <!-- Background Decorative Elements -->
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
    </div>
  `,
  styles: [`
    .login-page {
      height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center;
      background: radial-gradient(circle at top right, #f4f7fe 0%, #e2e8f0 100%);
      overflow: hidden; position: relative;
    }
    .login-card {
      width: 450px; padding: 3.5rem; z-index: 10;
      animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .login-header {
      text-align: center; margin-bottom: 3rem;
      .logo {
        display: inline-flex; align-items: center; gap: 10px; font-size: 1.8rem; font-weight: 800; color: #1a1a2e; margin-bottom: 1.5rem;
        .iconify { color: #4a90e2; font-size: 2.2rem; }
      }
      h1 { font-size: 1.5rem; font-weight: 700; color: #1a1a2e; margin-bottom: 0.5rem; }
      p { color: #718096; font-size: 0.9rem; }
    }
    .input-wrapper {
      position: relative;
      .input-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #a0aec0; font-size: 1.2rem; }
      input { padding-left: 3rem !important; }
    }
    .login-options {
      display: flex; justify-content: space-between; align-items: center; margin-top: -0.5rem; margin-bottom: 2rem;
      font-size: 0.85rem;
      .remember-me { display: flex; align-items: center; gap: 8px; cursor: pointer; color: #718096; }
      .forgot-link { color: #4a90e2; text-decoration: none; font-weight: 600; }
    }
    .login-btn { width: 100%; height: 55px; font-size: 1.1rem !important; }
    .login-footer {
      margin-top: 3rem; text-align: center; border-top: 1px solid #edf2f7; padding-top: 1.5rem;
      p { font-size: 0.8rem; color: #a0aec0; margin-bottom: 4px; }
      span { font-size: 0.7rem; color: #cbd5e0; text-transform: uppercase; letter-spacing: 1px; }
    }
    .blob {
      position: absolute; border-radius: 50%; filter: blur(80px); z-index: 1; opacity: 0.4;
      &.blob-1 { width: 400px; height: 400px; background: #4a90e2; top: -100px; right: -100px; }
      &.blob-2 { width: 300px; height: 300px; background: #805ad5; bottom: -50px; left: -50px; }
    }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  remember = false;
  loading = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  login() {
    if (!this.username || !this.password) return;
    this.loading = true;
    this.cdr.markForCheck();
    
    // Simulate auth delay
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/dashboard']);
    }, 1500);
  }
}
