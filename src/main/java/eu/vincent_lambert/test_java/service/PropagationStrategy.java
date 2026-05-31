package eu.vincent_lambert.test_java.service;

import java.util.LinkedList;

import eu.vincent_lambert.test_java.model.ForestState;
import eu.vincent_lambert.test_java.model.ForestState.TreeCoordinates;
import eu.vincent_lambert.test_java.model.ForestState.Trees;
import eu.vincent_lambert.test_java.service.SimulationService.Settings;


abstract public class PropagationStrategy {
    protected SimulationService.Settings settings;

    public PropagationStrategy(Settings settings) {
        this.settings = settings;
    }

    abstract public ForestState propagateFire(ForestState.Trees firedUpTrees, ForestState.Trees deadTrees);

    static protected LinkedList<TreeCoordinates> getNeighbours(Settings settings, TreeCoordinates tree) {
        LinkedList<TreeCoordinates> neighbours = new LinkedList<TreeCoordinates>();

        if (settings.getGridWidth() != null && tree.getX() > 0) {
            neighbours.add(new TreeCoordinates(tree.getX()-1, tree.getY())); // West neighbour
        }
        if (settings.getGridWidth() != null && tree.getX() < settings.getGridWidth() - 1) {
            neighbours.add(new TreeCoordinates(tree.getX()+1, tree.getY())); // East neighbour
        }
        if (settings.getGridHeight() != null && tree.getY() > 0) {
            neighbours.add(new TreeCoordinates(tree.getX(), tree.getY()-1)); // North neighbour
        }
        if (settings.getGridHeight() != null && tree.getY() < settings.getGridHeight() - 1) {
            neighbours.add(new TreeCoordinates(tree.getX(), tree.getY()+1)); // South neighbour
        }

        return neighbours;
    }

    static protected Boolean fireUp(Settings settings) {
        return Math.random() < settings.getPropagProb();
    }

    public static class AllOrNothing extends PropagationStrategy {
        public AllOrNothing(Settings settings) {
            super(settings);
        }

        public ForestState propagateFire(ForestState.Trees firedUpTrees, ForestState.Trees deadTrees) {
            Trees newlyFiredUpTrees = new Trees();
            LinkedList<TreeCoordinates> treeNeighbours = new LinkedList<TreeCoordinates>();

            for (TreeCoordinates tree : firedUpTrees) {
                if (fireUp(this.settings)) {
                    treeNeighbours.addAll(getNeighbours(this.settings, tree));

                    for (TreeCoordinates treeNeighbour : treeNeighbours) {
                        if (!firedUpTrees.contains(treeNeighbour) && 
                            !deadTrees.contains(treeNeighbour)) {
                            // If the tree was not already on fire and has not already been extinguished, it can catch fire
                            // Considering that we use HashMaps to store the trees, the same tree cannot be added twice, 
                            // so we don't need to check if it's already in the list of newly fired up trees
                            newlyFiredUpTrees.add(treeNeighbour);
                        }
                    }
                    treeNeighbours.clear();
                }
            }

            // Now the newly fired up trees have been determined, we can extinguish trees and add them to the list of dead trees
            Trees newlyDeadTrees = firedUpTrees;
            deadTrees.append(newlyDeadTrees);
            return new ForestState(newlyFiredUpTrees, deadTrees);
        }
    }

    public static class ByNeighbour extends PropagationStrategy {
        public ByNeighbour(Settings settings) {
            super(settings);
        }

        public ForestState propagateFire(ForestState.Trees firedUpTrees, ForestState.Trees deadTrees) {
            Trees newlyFiredUpTrees = new Trees();
            LinkedList<TreeCoordinates> treeNeighbours = new LinkedList<TreeCoordinates>();

            for (TreeCoordinates tree : firedUpTrees) {
                treeNeighbours.addAll(getNeighbours(this.settings, tree));

                for (TreeCoordinates treeNeighbour : treeNeighbours) {
                    if (fireUp(this.settings) &&
                        !firedUpTrees.contains(treeNeighbour) && 
                        !deadTrees.contains(treeNeighbour)) {
                        // If the tree was not already on fire and has not already been extinguished, it can catch fire
                        // Considering that we use HashMaps to store the trees, the same tree cannot be added twice, 
                        // so we don't need to check if it's already in the list of newly fired up trees
                        newlyFiredUpTrees.add(treeNeighbour);
                    }
                }
                treeNeighbours.clear();
            }

            // Now the newly fired up trees have been determined, we can extinguish trees and add them to the list of dead trees
            Trees newlyDeadTrees = firedUpTrees;
            deadTrees.append(newlyDeadTrees);
            return new ForestState(newlyFiredUpTrees, deadTrees);
        }
    }
}
