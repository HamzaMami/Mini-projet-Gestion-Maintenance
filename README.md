Maintenance App — MySQL configuration

What I changed
- Switched the project from H2 in-memory to MySQL.
- Edited `pom.xml` to include the MySQL Connector/J runtime dependency (`com.mysql:mysql-connector-j:8.0.33`).
- Updated `src/main/resources/application.properties` to use a MySQL datasource URL and added the Hibernate MySQL dialect.

Files changed
- `pom.xml`
- `src/main/resources/application.properties`

How to configure your MySQL database
1. Create a database and a user (run these in your MySQL shell or via an admin tool):

```sql
CREATE DATABASE maintenance_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'maintenance_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON maintenance_db.* TO 'maintenance_user'@'localhost';
FLUSH PRIVILEGES;
```

2. Edit `src/main/resources/application.properties` and set the username/password and, if needed, the host/port.

Quick run (from project root on Windows PowerShell):

```powershell
# Build the project (downloads dependencies)
.\mvnw -DskipTests package

# Run the app
.\mvnw spring-boot:run
# or run the built jar
java -jar target\maintenance-app-0.0.1-SNAPSHOT.jar
```

Notes and next steps
- The app uses `spring.jpa.hibernate.ddl-auto=update` by default so Hibernate will create/alter tables automatically. For production, switch to validated migrations (Flyway/Liquibase) or `ddl-auto=validate`.
- I left some transitive dependency security warnings from the IDE's scanner (these come from Spring Boot starter dependencies). They don't block the build but you may want to review dependency versions.
- If you prefer credentials outside of source control, move them to environment variables or an external config (e.g., `application-local.properties`) and use Spring profiles.

If you want, I can also:
- Add a sample `application-local.properties` and use profiles.
- Add Flyway migrations instead of `ddl-auto=update`.
- Wire up Docker Compose for MySQL to make local setup reproducible.
