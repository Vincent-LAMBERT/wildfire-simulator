package eu.vincent_lambert.test_java.model;

import java.util.List;

public class Simulation {
    private int gridWidth;
    private int gridHeight;
    private double simulStep;
    private double propagProb;
    private List<TreeCoordinates> firedUpTrees;
    private int[][] grid; // Current grid state

    // Getters and setters
    public static class TreeCoordinates {
        private int x;
        private int y;

        // Getters and setters
        public int getX() { return x; }
        public void setX(int x) { this.x = x; }
        public int getY() { return y; }
        public void setY(int y) { this.y = y; }
    }

    // Getters and setters for GridState
    public int getGridWidth() { return gridWidth; }
    public void setGridWidth(int gridWidth) { this.gridWidth = gridWidth; }
    public int getGridHeight() { return gridHeight; }
    public void setGridHeight(int gridHeight) { this.gridHeight = gridHeight; }
    public double getSimulStep() { return simulStep; }
    public void setSimulStep(double simulStep) { this.simulStep = simulStep; }
    public double getPropagProb() { return propagProb; }
    public void setPropagProb(double propagProb) { this.propagProb = propagProb; }
    public List<TreeCoordinates> getFiredUpTrees() { return firedUpTrees; }
    public void setFiredUpTrees(List<TreeCoordinates> firedUpTrees) { this.firedUpTrees = firedUpTrees; }
    public int[][] getGrid() { return grid; }
    public void setGrid(int[][] grid) { this.grid = grid; }
}