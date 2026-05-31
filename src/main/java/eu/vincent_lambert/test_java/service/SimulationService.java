package eu.vincent_lambert.test_java.service;

import org.springframework.stereotype.Service;

import eu.vincent_lambert.test_java.model.ForestState;
import eu.vincent_lambert.test_java.service.PropagationStrategy.AllOrNothing;
import eu.vincent_lambert.test_java.service.PropagationStrategy.ByNeighbour;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Service
public class SimulationService {
    private final ForestState forestState = new ForestState();

    @Getter @Setter private Settings settings;

    @Getter @Setter private PropagationStrategy strategy;

    @Data
    public static class Settings {
        private String strategy;
        private Integer gridWidth;
        private Integer gridHeight;
        private Float propagProb;
    }

    public ForestState executeStrategy(ForestState.Trees firedUpTrees, ForestState.Trees deadTrees) {
        return this.strategy.propagateFire(firedUpTrees, deadTrees);
    }

    public ForestState calculateNextStep(ForestState forestState) {
        // We first get the current state of the simulation, possibly altered by the front end, 
        // and update the internal state of the simulation with it
        this.forestState.setFiredUpTrees(forestState.getFiredUpTrees());
        this.forestState.setDeadTrees(forestState.getDeadTrees());

        // Two strategies are possible to determine the fire propagation logic:
        // 1. ALL_OR_NOTHING: if a tree is on fire, it has a probability to set all of its neighbours on fire at the same time or not at all.
        // 2. INDEPENDENT_PROBABILITY: if a tree is on fire, for each of its neighbours, we check independently if it catches fire or not based on the propagation probability.
        switch (this.getSettings().getStrategy()) {
            case "all_or_nothing":
                this.setStrategy(new AllOrNothing(this.getSettings()));
                break;
            case "by_neighbour":
                this.setStrategy(new ByNeighbour(this.getSettings()));
                break;
            default:
                throw new IllegalArgumentException("Invalid strategy: " + this.getSettings().getStrategy());
        }
        
        return this.executeStrategy(this.forestState.getFiredUpTrees(), this.forestState.getDeadTrees());
    }
}