package eu.vincent_lambert.test_java.service;

import org.springframework.stereotype.Service;

import eu.vincent_lambert.test_java.model.Simulation;

@Service
public class SimulationService {

    public Simulation calculateNextStep(Simulation currentState) {
        // Implement your simulation logic here
        // For example: update the grid, propagate fire, etc.

        // Clone the current state to avoid modifying the input directly
        Simulation newState = new Simulation();
        newState.setGridWidth(currentState.getGridWidth());
        newState.setGridHeight(currentState.getGridHeight());
        newState.setSimulStep(currentState.getSimulStep());
        newState.setPropagProb(currentState.getPropagProb());
        newState.setFiredUpTrees(currentState.getFiredUpTrees());
        newState.setGrid(currentState.getGrid());

        // Example: Update the grid (replace with your logic)
        int[][] grid = currentState.getGrid();
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[i].length; j++) {
                // Your simulation logic here
                // For example: if a tree is on fire, propagate it to neighbors
            }
        }

        return newState;
    }
}