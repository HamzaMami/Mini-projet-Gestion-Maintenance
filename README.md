# 🔧 Maintenance Management System

A full-stack application to manage equipment, failures, interventions,
and technicians in a maintenance context.

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Spring Boot 4.0.5 |
| Database | MySQL |
| Frontend | Angular 17+ (Standalone) |
| Language | Java 25 & TypeScript |
| ORM | Hibernate / JPA |
| Build Tool | Maven & NPM |

---

## 📦 Project Structure

```
maintenance-app/
├── backend/            → Spring Boot Project
│     ├── src/          → Java source code
│     ├── pom.xml       → Maven configuration
│     └── ...
└── frontend/           → Angular Project
      ├── src/app/      → Angular source code
      ├── package.json  → NPM configuration
      └── ...
```

---

## 🗄️ Database Design

### Entities

| Entity | Fields |
|---|---|
| `Equipement` | id, nom, etat, dateAcquisition |
| `Panne` | id, description, categorie, dateSignalement, equipement |
| `Technicien` | id, nom, competences, disponibilite |
| `Intervention` | id, statut, date, cout, equipement, technician |

### Relationships
```
1 Equipement  →  many Pannes
1 Equipement  →  many Interventions
1 Technicien  →  many Interventions
```

---

## 🌐 API Endpoints

### Base URL: `/api`

| Endpoint | Method | Description |
|---|---|---|
| `/equipements` | GET | Get all equipment |
| `/pannes` | GET | Get all failures |
| `/interventions` | GET | Get all interventions |
| `/dashboard` | GET | Get system summary |

---

## 🚀 How to Run

### 1. Backend Setup
```bash
cd backend
# Update application.properties with your MySQL credentials
./mvnw spring-boot:run
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## ✅ Development Status

- [x] Project Restructuring (Backend/Frontend)
- [x] Backend API Implementation
- [x] MySQL Integration
- [x] Angular Frontend Setup
- [x] Dashboard Component
- [x] Equipement List Component
- [ ] Full Frontend Implementation
- [ ] Final Testing

---

## 👨💻 Author

Hamza Mami — GL2 JEE Project
