package eu.vincent_lambert.test_java.controller;

import java.util.LinkedList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eu.vincent_lambert.test_java.model.ForestState;
import eu.vincent_lambert.test_java.model.ForestState.TreeCoordinates;
import eu.vincent_lambert.test_java.service.SimulationService;
import eu.vincent_lambert.test_java.service.SimulationService.Settings;
import lombok.Data;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/simulation")
public class SimulationController {
    private final SimulationService simulationService;

    public SimulationController(SimulationService simulationService) {
        this.simulationService = simulationService;
    }

    @Data
    public static class SimulationState {
        private Settings settings;
        private LinkedList<TreeCoordinates> firedUpTrees = new LinkedList<TreeCoordinates>();
        private LinkedList<TreeCoordinates> deadTrees = new LinkedList<TreeCoordinates>();

        public SimulationState() {}

        public SimulationState(Settings settings, LinkedList<TreeCoordinates> firedUpTrees, LinkedList<TreeCoordinates> deadTrees) {
            this.settings = settings;
            this.firedUpTrees = firedUpTrees;
            this.deadTrees = deadTrees;
        }

        public SimulationState(ForestState forestState) {
            this.firedUpTrees = new LinkedList<TreeCoordinates>();
            for (TreeCoordinates tree : forestState.getFiredUpTrees()) {
                this.firedUpTrees.add(tree);
            }
            this.deadTrees = new LinkedList<TreeCoordinates>();
            for (TreeCoordinates tree : forestState.getDeadTrees()) {
                this.deadTrees.add(tree);
            }
        }

        public ForestState getForestState() {
            ForestState forestState = new ForestState();
            for (TreeCoordinates tree : this.firedUpTrees) {
                forestState.getFiredUpTrees().add(tree);
            }
            for (TreeCoordinates tree : this.deadTrees) {
                forestState.getDeadTrees().add(tree);
            }
            return forestState;
        }
    }

    @PostMapping("/step")
    public SimulationState nextStep(@RequestBody SimulationState frontEndForestState) {
        simulationService.setSettings(frontEndForestState.getSettings());
        return new SimulationState(simulationService.calculateNextStep(frontEndForestState.getForestState()));
    }
}