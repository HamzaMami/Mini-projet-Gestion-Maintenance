# 🔧 Maintenance Management System

A full-stack application to manage equipment, failures, interventions,
and technicians in a maintenance context.

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Spring Boot 4.0.5 |
| Database | H2 (in-memory) |
| Frontend | Angular (coming soon) |
| Language | Java 25 |
| ORM | Hibernate / JPA |
| Build Tool | Maven |

---

## 📦 Project Structure

```
com.maintenance.maintenanceapp/
├── controller/        → HTTP request handlers
├── service/           → Business logic interfaces
│     └── impl/        → Business logic implementations
├── repository/        → Database access (JPA)
├── entity/            → Database tables as Java classes
├── dto/               → Data Transfer Objects
├── config/            → CORS configuration
└── exception/         → Global exception handling
```

---

## 🗄️ Database Design

### Entities

| Entity | Fields |
|---|---|
| `Equipement` | id, nom, etat, dateAcquisition |
| `Panne` | id, description, categorie, dateSignalement, equipement |
| `Technicien` | id, nom, competences, disponibilite |
| `Intervention` | id, statut, date, cout, equipement, technicien |

### Relationships
```
1 Equipement  →  many Pannes
1 Equipement  →  many Interventions
1 Technicien  →  many Interventions
```

### Intervention Status (Enum)
```
PLANIFIE → EN_COURS → TERMINE
```

---

## 🌐 API Endpoints

### Equipement
```
GET    /api/equipements         → get all
GET    /api/equipements/{id}    → get by id
POST   /api/equipements         → create
PUT    /api/equipements/{id}    → update
DELETE /api/equipements/{id}    → delete
```

### Panne
```
GET    /api/pannes              → get all
GET    /api/pannes/{id}         → get by id
POST   /api/pannes              → create
PUT    /api/pannes/{id}         → update
DELETE /api/pannes/{id}         → delete
```

### Technicien
```
GET    /api/techniciens         → get all
GET    /api/techniciens/{id}    → get by id
POST   /api/techniciens         → create
PUT    /api/techniciens/{id}    → update
DELETE /api/techniciens/{id}    → delete
```

### Intervention
```
GET    /api/interventions                        → get all
GET    /api/interventions/{id}                   → get by id
POST   /api/interventions                        → create
PUT    /api/interventions/{id}                   → update
DELETE /api/interventions/{id}                   → delete
PUT    /api/interventions/{id}/assign/{techId}   → assign technician
```

### Dashboard
```
GET    /api/dashboard           → get system summary
```

---

## 📤 Request Body Examples

### POST /api/equipements
```json
{
    "nom": "Ordinateur Dell",
    "etat": "FONCTIONNEL",
    "dateAcquisition": "2024-01-15"
}
```

### POST /api/techniciens
```json
{
    "nom": "Ahmed Ben Ali",
    "competences": "Electricité, Informatique",
    "disponibilite": true
}
```

### POST /api/pannes
```json
{
    "description": "Ecran cassé",
    "categorie": "Matériel",
    "dateSignalement": "2024-03-10",
    "equipement": {
        "id": 1
    }
}
```

### POST /api/interventions
```json
{
    "statut": "PLANIFIE",
    "date": "2024-03-15",
    "cout": 150.0,
    "equipement": {
        "id": 1
    }
}
```

### GET /api/dashboard response
```json
{
    "totalPannes": 1,
    "totalInterventions": 1,
    "totalTechniciens": 1,
    "techniciensDisponibles": 1
}
```

---

## ⚙️ Configuration

```properties
# application.properties
spring.datasource.url=jdbc:h2:mem:maintenancedb
spring.datasource.driver-class-name=org.h2.Driver
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
server.port=8080
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
```

---

## 🚀 How to Run

**1. Clone the repository:**
```bash
git clone https://github.com/HamzaMami/Mini-projet-Gestion-Maintenance.git
```

**2. Navigate to the project:**
```bash
cd maintenance-app
```

**3. Run with Maven:**
```bash
./mvnw spring-boot:run
```

**4. Access the app:**
```
API Base URL  → http://localhost:8080
H2 Console    → http://localhost:8080/h2-console
```

**5. H2 Console login:**
```
JDBC URL  → jdbc:h2:mem:maintenancedb
Username  → sa
Password  → (leave empty)
```

---

## 🏗️ Architecture

```
Client (Postman / Angular)
        ↓
@RestController   → receives HTTP requests
        ↓
@Service          → business logic
        ↓
@Repository       → database access
        ↓
H2 Database       → stores data
```

---

## 🌱 Spring Beans Used

| Annotation | Role |
|---|---|
| `@RestController` | API layer |
| `@Service` | Business logic |
| `@Repository` | Data access |
| `@Configuration` | CORS config |

---

## ✅ Development Status

- [x] Project setup
- [x] Entities
- [x] Repositories
- [x] Services
- [x] Controllers
- [x] CORS Configuration
- [x] Exception Handling
- [x] Dashboard Endpoint
- [x] Postman Testing
- [ ] Angular Frontend
- [ ] Final Testing
- [ ] Final Review

---

## 👨‍💻 Author

Hamza Mami — GL2 JEE Project
