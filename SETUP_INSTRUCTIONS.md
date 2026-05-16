# Maintenance App - Setup Instructions

## 🔧 Current Configuration

### Backend
- **Port:** 8081 (changed from 8080 to avoid conflicts)
- **Database:** MySQL on localhost:3307
- **Database User:** jeeuser
- **Database Password:** n2N1((J]-tNuySJ9

### Frontend
- **Port:** 4200 (Angular dev server default)
- **Backend API URL:** http://127.0.0.1:8081/api
- **Auth API URL:** http://127.0.0.1:8081/api/auth

### Database (Docker)
- **Image:** MySQL 8.0
- **Container:** maintenance-mysql
- **Port:** 3307
- **Database:** maintenance_db

## 🚀 How to Start the Application

### 1. Start MySQL (if not already running)
```bash
cd D:\Hamza\Home\Cycle\2-Gl-S2\JEE\maintenance-app
docker-compose up -d
```

### 2. Start Backend (in one terminal)
```bash
cd D:\Hamza\Home\Cycle\2-Gl-S2\JEE\maintenance-app\backend
mvn clean install
mvn spring-boot:run
```
The backend will start on `http://localhost:8081`

### 3. Start Frontend (in another terminal)
```bash
cd D:\Hamza\Home\Cycle\2-Gl-S2\JEE\maintenance-app\frontend
npm install
npm start
```
The frontend will start on `http://localhost:4200`

## 🔐 Login Credentials

**Username:** `admin`  
**Password:** `admin123`

## ✅ CORS Configuration

The backend allows requests from:
- `http://localhost:4200`
- `http://localhost:3000`
- `http://localhost:5173`
- `http://127.0.0.1:4200`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:5173`

## 🔧 Files Modified

1. **backend/src/main/resources/application.properties**
   - Changed server port to 8081

2. **backend/src/main/java/com/maintenance/maintenanceapp/config/SecurityConfig.java**
   - Enhanced CORS configuration
   - Added support for multiple development ports

3. **frontend/src/app/services/auth.service.ts**
   - Updated API URL to use port 8081

4. **frontend/src/app/services/api.service.ts**
   - Updated API URL to use port 8081

## 📝 Troubleshooting

### Port 8081 already in use
Change port in `application.properties`:
```properties
server.port=8082
```
And update both frontend services accordingly.

### Frontend can't connect to backend
1. Verify backend is running on port 8081
2. Check browser console for CORS errors
3. Ensure MySQL container is running

### Database connection error
Verify MySQL container is running:
```bash
docker ps
```
If not running:
```bash
docker-compose up -d
```
