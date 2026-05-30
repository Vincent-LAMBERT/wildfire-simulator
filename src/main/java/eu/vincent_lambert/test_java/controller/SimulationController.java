package eu.vincent_lambert.test_java.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eu.vincent_lambert.test_java.model.Simulation;
import eu.vincent_lambert.test_java.service.SimulationService;

@RestController
@RequestMapping("/api/simulation")
public class SimulationController {
    private final SimulationService simulationService;

    public SimulationController(SimulationService simulationService) {
        this.simulationService = simulationService;
    }

    @PostMapping("/step")
    public Simulation nextStep(@RequestBody Simulation currentStateSimulation) {
        // Delegate the simulation logic to a service
        return simulationService.calculateNextStep(currentStateSimulation);
    }
}