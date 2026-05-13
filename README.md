# Maintenix - Industrial Maintenance Management System

A professional, enterprise-grade solution for managing industrial assets, maintenance requests, and technician assignments.

## 🚀 Recent Upgrades
- **JWT Authentication**: Secured the entire platform with stateless JSON Web Tokens.
- **Enterprise Architecture**: Decoupled components using DTOs (Data Transfer Objects) and resolved complex dependency cycles.
- **Cloud Ready**: Full containerization for both Frontend (Nginx/Angular) and Backend (Spring Boot).
- **GCP Integration**: Ready for deployment to Google Cloud Run with automated Cloud Build pipelines.

## 🛠️ Technology Stack
- **Frontend**: Angular 21 (Standalone Components, Signals, SCSS)
- **Backend**: Spring Boot 3.4 (Java 17, Spring Security 6+, JPA/Hibernate)
- **Database**: MySQL (Compatible with Cloud SQL)
- **Security**: JWT (jjwt 0.11.5), BCrypt Password Hashing
- **DevOps**: Docker, Google Cloud Build, Nginx

## 🔒 Security & Auth
- **Default Admin**: `admin` / `admin123`
- **Authentication**: Token-based (JWT). The frontend automatically injects tokens into every request via an `AuthInterceptor`.

## ☁️ Cloud Deployment Guide

### 1. Build and Push
Run the following command from the root directory:
```bash
gcloud builds submit --config cloudbuild.yaml .
```

### 2. Manual Service Deployment (Cloud Run)

**Backend:**
```bash
gcloud run deploy maintenix-backend \
  --image gcr.io/[PROJECT_ID]/maintenix-backend \
  --set-env-vars "DB_URL=jdbc:mysql://[DB_IP]:3306/maintenance_db,DB_USER=root,DB_PASSWORD=[PASS]"
```

**Frontend:**
```bash
gcloud run deploy maintenix-frontend \
  --image gcr.io/[PROJECT_ID]/maintenix-frontend
```

---
*Maintenix - Optimizing industrial uptime through intelligent maintenance.*
