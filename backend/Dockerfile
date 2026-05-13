# Use Eclipse Temurin for a more stable and cloud-ready Java environment
FROM eclipse-temurin:17-jdk-focal
WORKDIR /app
# Copy the built jar file
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
