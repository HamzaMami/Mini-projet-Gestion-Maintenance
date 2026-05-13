package com.maintenance.maintenanceapp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDTO {
    private long totalPannes;
    private long totalInterventions;
    private long totalTechniciens;
    private long techniciensDisponibles;
    private long totalEquipements;
}
